using LAB9_2.domain;
using LAB9_2.repository;
using LAB9_2.validation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace LAB9_2.repository
{
    class NotaFileRepository : AbstractFileRepository<KeyValuePair<Student, Tema>, Nota>
    {
        StudentFileRepository Studenti;
        TemaFileRepository Teme;

        public NotaFileRepository(IValidator<Nota> validator, StudentFileRepository Studenti, TemaFileRepository Teme, string filename) : base(validator, filename)
        {
            this.Studenti = Studenti;
            this.Teme = Teme;
            LoadFromFile();
        }

        protected override void LoadFromFile()
        {
            using (StreamReader streamReader = new StreamReader(filename))
            {
                string line;
                while ( (line = streamReader.ReadLine()) != null )
                {
                    string[] fields = line.Split(';');
                    Student student = Studenti.FindOne(fields[0]);
                    Tema tema = Teme.FindOne(fields[1]);
                    Nota nota = new Nota(new KeyValuePair<Student, Tema>(student, tema), double.Parse(fields[2]), int.Parse(fields[3]), fields[4]);
                    JustSave(nota);
                }
                streamReader.Close();
            }
        }

        protected override void WriteToFile(Nota entity)
        {
            using (StreamWriter streamWriter = new StreamWriter(filename, true))
            {
                string nota = entity.Id.Key.Id + ";" + entity.Id.Value.Id + ";" + entity.Valoare.ToString() + ";" + entity.SaptamanaPredare.ToString() + ";" + entity.Feedback;
                streamWriter.WriteLine(nota);
                streamWriter.Flush();
            }
        }

        protected override void WriteToFileAll()
        {
            using (StreamWriter streamWriter = new StreamWriter(filename, true))
            {
                List<Nota> note = FindAll();

                foreach (Nota entity in note)
                {
                    string nota = entity.Id.Key + "," + entity.Id.Value + "," + entity.Valoare.ToString() + "," + entity.SaptamanaPredare.ToString() + "," + entity.Feedback;
                    streamWriter.WriteLine(nota);
                }
                streamWriter.Flush();
            }
        }
    }
}
