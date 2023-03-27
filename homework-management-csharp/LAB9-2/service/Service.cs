using LAB9_2.domain;
using LAB9_2.repository;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace LAB9_2.service
{
    class Service
    {
        private StudentFileRepository StudentRepo;
        private TemaFileRepository TemaRepo;
        private NotaFileRepository NotaRepo;

        public Service(StudentFileRepository StudentRepo, TemaFileRepository TemaRepo, NotaFileRepository NotaRepo)
        {
            this.StudentRepo = StudentRepo;
            this.TemaRepo = TemaRepo;
            this.NotaRepo = NotaRepo;
        }

        public List<Student> FindAllStudents()
        {
            return StudentRepo.FindAll();
        }

        public List<Tema> FindAllTeme()
        {
            return TemaRepo.FindAll();
        }

        public List<Nota> FindAllNote()
        {
            return NotaRepo.FindAll();
        }

        public int SaveStudent(String Id, String Nume, int Grupa)
        {
            Student student = new Student(Id, Nume, Grupa);
            Student result = StudentRepo.Save(student);

            if (result == null) return 1;
            return 0;
        }

        public int SaveTema(String Id, String Descriere, int Deadline, int Startline)
        {
            Tema tema = new Tema(Id, Descriere, Deadline, Startline);
            Tema result = TemaRepo.Save(tema);

            if (result == null) return 1;
            return 0;
        }

        public int SaveNota(String IdStudent, String IdTema, double Valoare, int SaptamanaPredare, string Feedback)
        {
            Student student = StudentRepo.FindOne(IdStudent);
            Tema tema = TemaRepo.FindOne(IdTema);
            if (student == null || tema == null) return -1;

            int Deadline = tema.Deadline;
            if (SaptamanaPredare - Deadline > 2) Valoare = 0;
            else Valoare = Valoare - 2.5 * (SaptamanaPredare - Deadline);

            Nota nota = new Nota(new KeyValuePair<Student, Tema>(student, tema), Valoare, SaptamanaPredare, Feedback);
            Nota result = NotaRepo.Save(nota);

            if (result == null) return 1;
            return 0;
        }

        public int DeleteStudent(String Id)
        {
            Student result = StudentRepo.Delete(Id);

            if (result == null) return 0;
            return 1;
        }

        public int DeleteTema(String Id)
        {
            Tema result = TemaRepo.Delete(Id);

            if (result == null) return 0;
            return 1;
        }

        public int UpdateStudent(String Id, String NumeNou, int GrupaNoua)
        {
            Student student = new Student(Id, NumeNou, GrupaNoua);
            Student result = StudentRepo.Update(student);

            if (result == null) return 1;
            return 0;
        }

        public int UpdateTema(String Id, String DescriereNoua, int DeadlineNou, int StartlineNou)
        {
            Tema tema = new Tema(Id, DescriereNoua, DeadlineNou, StartlineNou);
            Tema result = TemaRepo.Update(tema);

            if (result == null) return 1;
            return 0;
        }

        public int GetAdaptedWeek(int CurrentWeek)
        {
            if (CurrentWeek >= 39 && CurrentWeek <= 51) CurrentWeek = CurrentWeek - 39;
            else if (CurrentWeek == 52 || CurrentWeek == 53 || CurrentWeek == 1) CurrentWeek = 12;
            else if (CurrentWeek > 1 && CurrentWeek < 4) CurrentWeek = CurrentWeek + 11;
            else if (CurrentWeek >= 4 && CurrentWeek <= 8) CurrentWeek = 14;
            else CurrentWeek = CurrentWeek - 8;

            return CurrentWeek;
        }

        public int ExtendDeadline(String Id, int NrWeeks)
        {
            Tema tema = TemaRepo.FindOne(Id);

            if (tema != null)
            {
                int CurrentWeek = GetAdaptedWeek(CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(DateTime.Now, CalendarWeekRule.FirstDay, DayOfWeek.Monday));

                if (CurrentWeek <= tema.Deadline)
                {
                    int DeadlineNou = tema.Deadline + NrWeeks;
                    return UpdateTema(tema.Id, tema.Descriere, DeadlineNou, tema.Startline);
                }
            }
            return 0;
        }

        public List<Nota> NoteTema(string IdTema)
        {
            List<Nota> note = FindAllNote();

            var result = (from nota in note
                          where nota.Id.Value.Id == IdTema
                          select nota).ToList();

            return result;
        }

        public List<Nota> NoteStudent(string IdStudent)
        {
            List<Nota> note = FindAllNote();

            var result = (from nota in note
                          where nota.Id.Key.Id == IdStudent
                          select nota).ToList();

            return result;
        }

        public List<Nota> NoteStudentiGrupaTema(int Grupa, string IdTema)
        {
            List<Nota> note = FindAllNote();

            var result = (from nota in note
                          where nota.Id.Value.Id == IdTema && StudentRepo.FindOne(nota.Id.Key.Id).Grupa == Grupa
                          select nota).ToList();

            return result;
        }

        public List<Nota> NotePerioadaCalendaristica(string DataInceput, string DataSfarsit)
        {
            List<Nota> note = FindAllNote();

            DateTime inceput = DateTime.Parse(DataInceput);
            int BeginWeek = GetAdaptedWeek(CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(inceput, CalendarWeekRule.FirstDay, DayOfWeek.Monday));

            DateTime sfarsit = DateTime.Parse(DataSfarsit);
            int EndWeek = GetAdaptedWeek(CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(sfarsit, CalendarWeekRule.FirstDay, DayOfWeek.Monday));

            var result = (from nota in note
                          where BeginWeek <= nota.SaptamanaPredare && nota.SaptamanaPredare <= EndWeek
                          select nota).ToList();

            return result;
        }

        public List<KeyValuePair<Student, double>> NotaLaboratorStudent()
        {
            var result = from nota in FindAllNote()
                         group nota by nota.Id.Key into grup
                         select new KeyValuePair<Student, double>(grup.Key, grup.Average(x => 
                         {
                             double suma = grup.Sum(y => (TemaRepo.FindOne(y.Id.Value.Id).Deadline - TemaRepo.FindOne(y.Id.Value.Id).Startline) * y.Valoare);
                             double sumaPondere = grup.Sum(y => TemaRepo.FindOne(y.Id.Value.Id).Deadline - TemaRepo.FindOne(y.Id.Value.Id).Startline);
                             return suma / sumaPondere;
                         }));

            return result.ToList();
        }

        public KeyValuePair<Tema, double> CeaMaiGreaTema()
        {
            var result = from nota in FindAllNote()
                         group nota by nota.Id.Value into grup
                         select new KeyValuePair<Tema, double>(grup.Key, grup.Min(x => 
                         {
                             double suma = grup.Sum(y => y.Valoare);
                             double cate = grup.Count();
                             return suma / cate;
                         }));


            return result.ToList().First();
        }

        public IEnumerable<Student> StudentiCareDauExamen()
        {
            var result = from medie in NotaLaboratorStudent()
                         where medie.Value >= 4
                         select medie.Key;

            return result;
        }

        public IEnumerable<Student> StudentiTemelePredateLaTimp()
        {
            var result = from nota in FindAllNote()
                         group nota by nota.Id.Key into grup
                         where grup.Count() == (from nota in grup
                                                where nota.SaptamanaPredare == TemaRepo.FindOne(nota.Id.Value.Id).Deadline
                                                select nota).Count()
                         select grup.Key;

            return result;
        }
    }
}
