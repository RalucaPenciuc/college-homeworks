using LAB9_2.domain;
using LAB9_2.validation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace LAB9_2.repository
{
    class TemaFileRepository : AbstractFileRepository<string, Tema>
    {
        public TemaFileRepository(IValidator<Tema> validator, string filename) : base(validator, filename)
        {
            LoadFromFile();
        }

        protected override void LoadFromFile()
        {
            using (StreamReader streamReader = new StreamReader(filename))
            {
                string line;
                while( (line = streamReader.ReadLine()) != null)
                {
                    string[] fields = line.Split(';');
                    Tema tema = new Tema(fields[0], fields[1], int.Parse(fields[2]), int.Parse(fields[3]));
                    JustSave(tema);
                }
                streamReader.Close();
            }
        }

        protected override void WriteToFile(Tema entity)
        {
            using (StreamWriter streamWriter = new StreamWriter(filename, true))
            {
                string tema = entity.Id + ";" + entity.Descriere + ";" + entity.Deadline + ";" + entity.Startline;
                streamWriter.WriteLine(tema);
                streamWriter.Flush();
            }
        }

        protected override void WriteToFileAll()
        {
            using (StreamWriter streamWriter = new StreamWriter(filename, true))
            {
                List<Tema> teme = FindAll();

                foreach (Tema entity in teme)
                {
                    string tema = entity.Id + "," + entity.Descriere + "," + entity.Deadline + "," + entity.Startline;
                    streamWriter.WriteLine(tema);
                }
                streamWriter.Flush();
            }
        }
    }
}
