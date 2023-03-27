using LAB9_2.domain;
using LAB9_2.service;
using LAB9_2.validation;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LAB9_2.console
{
    class UI
    {
        private Service Serv; 

        public UI(Service Serv)
        {
            this.Serv = Serv;
        }

        public void PrintMenu()
        {
            Console.WriteLine("11. Afiseaza toti studentii.");
            Console.WriteLine("12. Afiseaza toate temele.");
            Console.WriteLine("13. Afiseaza toate notele");

            Console.WriteLine("21. Adauga un nou student.");
            Console.WriteLine("22. Adauga o tema noua.");
            Console.WriteLine("23. Adauga o nota unui student pentru o tema.");

            Console.WriteLine("3. Sterge un student existent.");

            Console.WriteLine("4. Actualizeaza datele unui student.");

            Console.WriteLine("5. Prelungeste deadline-ul unei teme.");

            Console.WriteLine("61. Notele la o anumita tema.");
            Console.WriteLine("62. Notele unui student.");
            Console.WriteLine("63. Notele studentilor dintr-o grupa, la o tema.");
            Console.WriteLine("64. Notele dintr-o anumita perioada.");

            Console.WriteLine("71. Nota de laborator a fiecarui student.");
            Console.WriteLine("72. Cea mai grea tema.");
            Console.WriteLine("73. Studentii care pot intra in examen.");
            Console.WriteLine("74. Studentii care au predat la timp toate temele.");

            Console.WriteLine("0. EXIT \n");
        }

        public void UiPrintAllStudents()
        {
            foreach(Student student in Serv.FindAllStudents())
            {
                Console.WriteLine(student);
            }
            Console.WriteLine("\n");
        }

        public void UiPrintAllTeme()
        {
            foreach(Tema tema in Serv.FindAllTeme())
            {
                Console.WriteLine(tema);
            }
            Console.WriteLine("\n");
        }

        public void UiPrintAllNote()
        {
            foreach(Nota nota in Serv.FindAllNote())
            {
                Console.WriteLine(nota);
            }
            Console.WriteLine("\n");
        }

        public void UiSaveStudent()
        {
            Console.Write("Introduceti ID-ul studentului: ");
            String Id = Console.ReadLine();

            Console.Write("Introduceti numele studentului: ");
            String Nume = Console.ReadLine();

            Console.Write("Introduceti grupa studentului: ");
            int.TryParse(Console.ReadLine(), out int Grupa);

            if (Serv.SaveStudent(Id, Nume, Grupa) != 0)
                Console.WriteLine("Student adaugat cu succes! \n");
        }

        public void UiSaveTema()
        {
            Console.Write("Introduceti ID-ul temei: ");
            String Id = Console.ReadLine();

            Console.Write("Introduceti o descriere a temei: ");
            String Descriere = Console.ReadLine();

            Console.Write("Introduceti saptamana deadline a temei: ");
            int.TryParse(Console.ReadLine(), out int Deadline);

            Console.Write("Introduceti saptamana startline a temei: ");
            int.TryParse(Console.ReadLine(), out int Startline);

            if (Serv.SaveTema(Id, Descriere, Deadline, Startline) != 0)
                Console.WriteLine("Tema adaugata cu succes! \n");
        }

        public void UiSaveNota()
        {
            Console.Write("Introduceti ID-ul studentului: ");
            String IdStudent = Console.ReadLine();

            Console.Write("Introduceti ID-ul temei: ");
            String IdTema = Console.ReadLine();

            Console.Write("Introduceti valoarea notei: ");
            double.TryParse(Console.ReadLine(), out double Valoare);

            Console.Write("Introduceti saptamana de predare a temei: ");
            int.TryParse(Console.ReadLine(), out int Predata);

            Console.Write("Dati un feedback temei: ");
            String Feedback = Console.ReadLine();

            int result = Serv.SaveNota(IdStudent, IdTema, Valoare, Predata, Feedback);
            if (result == 1)
                Console.WriteLine("Nota adaugata cu succes! \n");
            else if (result == 0)
                    Console.WriteLine("Nota existenta! \n");
                else
                    Console.WriteLine("Student sau tema inexistenta! \n");
        }

        public void UiDeleteStudent()
        {
            Console.Write("Introduceti ID-ul studentului: ");
            String Id = Console.ReadLine();

            if (Serv.DeleteStudent(Id) != 0)
                Console.WriteLine("Student sters cu succes! \n");
            else
                Console.WriteLine("Studentul nu exista! \n");
        }

        public void UiUpdateStudent()
        {
            Console.Write("Introduceti ID-ul studentului: ");
            String Id = Console.ReadLine();

            Console.Write("Introduceti noul nume al studentului: ");
            String NumeNou = Console.ReadLine();

            Console.Write("Introduceti noua grupa a studentului: ");
            int.TryParse(Console.ReadLine(), out int GrupaNoua);

            if (Serv.UpdateStudent(Id, NumeNou, GrupaNoua) != 0)
                Console.WriteLine("Student actualizat cu succes! \n");
            else
                Console.WriteLine("Student inexistent! \n");
        }

        public void UiExtendDeadline()
        {
            Console.Write("Introduceti ID-ul temei: ");
            String Id = Console.ReadLine();

            Console.Write("Introduceti numarul de saptamani adaugate la deadline: ");
            int.TryParse(Console.ReadLine(), out int NrWeeks);

            if (Serv.ExtendDeadline(Id, NrWeeks) != 0)
                Console.WriteLine("Deadline extins cu succes! \n");
            else
                Console.WriteLine("Tema nu exista! \n");
        }

        public void UiFilter1()
        {
            Console.Write("Introduceti ID-ul temei: ");
            String IdTema = Console.ReadLine();

            List<Nota> result = Serv.NoteTema(IdTema);

            foreach(Nota nota in result)
            {
                Console.WriteLine(nota);
            }
            Console.WriteLine("\n");
        }

        public void UiFilter2()
        {
            Console.Write("Introduceti ID-ul studentului: ");
            String IdStudent = Console.ReadLine();

            List<Nota> result = Serv.NoteStudent(IdStudent);

            foreach(Nota nota in result)
            {
                Console.WriteLine(nota);
            }
            Console.WriteLine("\n");
        }

        public void UiFilter3()
        {
            Console.Write("Introduceti numarul grupei: ");
            int.TryParse(Console.ReadLine(), out int Grupa);

            Console.Write("Introduceti ID-ul temei: ");
            String IdTema = Console.ReadLine();

            List<Nota> result = Serv.NoteStudentiGrupaTema(Grupa, IdTema);

            foreach(Nota nota in result)
            {
                Console.WriteLine(nota);
            }
            Console.WriteLine("\n");
        }

        public void UiFilter4()
        {
            Console.WriteLine("READ ME: Formatul datei este dd-mm-yyyy");

            Console.Write("Introduceti data de inceput: ");
            string DataInceput = Console.ReadLine();

            Console.Write("Introduceti data de sfarsit: ");
            string DataSfarsit = Console.ReadLine();

            List<Nota> result = Serv.NotePerioadaCalendaristica(DataInceput, DataSfarsit);

            foreach(Nota nota in result)
            {
                Console.WriteLine(nota);
            }
            Console.WriteLine("\n");
        }

        public void UiRaport1()
        {
            var result = Serv.NotaLaboratorStudent();
            
            foreach(KeyValuePair<Student, double> x in result)
            {
                Console.WriteLine("Studentul {0} are media {1}", x.Key, x.Value);
            }
        }

        public void UiRaport2()
        {
            var result = Serv.CeaMaiGreaTema();

            Console.WriteLine("Cea mai grea tema este:\n  {0} \ncu media: \n  {1} \n", result.Key, result.Value);
        }

        public void UiRaport3()
        {
            var result = Serv.StudentiCareDauExamen();

            Console.WriteLine("Studentii care pot da examenul sunt: ");
            foreach(Student student in result)
            {
                Console.WriteLine(student);
            }
            Console.WriteLine("\n");
        }

        public void UiRaport4()
        {
            var result = Serv.StudentiTemelePredateLaTimp();

            Console.WriteLine("Studentii care au predat toate temele la timp: ");
            foreach (Student student in result)
            {
                Console.WriteLine(student);
            }
            Console.WriteLine("\n");
        }

        public void Run()
        {
            int cmd = -1;
            PrintMenu();

            while (cmd != 0)
            {
                Console.Write("Introduceti comanda: ");
                bool result = int.TryParse(Console.ReadLine(), out cmd);

                try
                {
                    switch (cmd)
                    {
                        case 11:
                            UiPrintAllStudents();
                            break;
                        case 12:
                            UiPrintAllTeme();
                            break;
                        case 13:
                            UiPrintAllNote();
                            break;
                        case 21:
                            UiSaveStudent();
                            break;
                        case 22:
                            UiSaveTema();
                            break;
                        case 23:
                            UiSaveNota();
                            break;
                        case 3:
                            UiDeleteStudent();
                            break;
                        case 4:
                            UiUpdateStudent();
                            break;
                        case 5:
                            UiExtendDeadline();
                            break;
                        case 61:
                            UiFilter1();
                            break;
                        case 62:
                            UiFilter2();
                            break;
                        case 63:
                            UiFilter3();
                            break;
                        case 64:
                            UiFilter4();
                            break;
                        case 71:
                            UiRaport1();
                            break;
                        case 72:
                            UiRaport2();
                            break;
                        case 73:
                            UiRaport3();
                            break;
                        case 74:
                            UiRaport4();
                            break;
                        case 0:
                            break;
                    }
                }
                catch (ValidationException ve)
                {
                    Console.WriteLine(ve.Message);
                }
                catch (ArgumentNullException)
                {
                    Console.WriteLine("Id-ul nu poate fi null! \n");
                }
                catch (ArgumentException)
                {
                    Console.WriteLine("Entitate existenta! \n");
                }
            }
        }
    }
}
