using LAB9_2.domain;
using LAB9_2.validation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace LAB9_2.repository
{
    class StudentFileRepository : AbstractFileRepository<string, Student>
    {
        public StudentFileRepository(IValidator<Student> validator, string filename) : base(validator, filename)
        {
            LoadFromFile();
        }

        protected override void LoadFromFile()
        {
            using (StreamReader streamReader = new StreamReader(filename))
            {
                string line;
                while ( (line = streamReader.ReadLine()) != null)
                {
                    string[] fields = line.Split(';');
                    Student student = new Student(fields[0], fields[1], int.Parse(fields[2]));
                    JustSave(student);
                }
                streamReader.Close();
            }
        }

        protected override void WriteToFile(Student entity)
        {
            using (StreamWriter streamWriter = new StreamWriter(filename, true))
            {
                string student = entity.Id + ";" + entity.Nume + ";" + entity.Grupa.ToString();
                streamWriter.WriteLine(student);
                streamWriter.Flush();
            }
        }

        protected override void WriteToFileAll()
        {
            using (StreamWriter streamWriter = new StreamWriter(filename, true))
            {
                List<Student> studenti = FindAll();

                foreach (Student entity in studenti)
                {
                    string student = entity.Id + "," + entity.Nume + "," + entity.Grupa.ToString();
                    streamWriter.WriteLine(student);
                }
                streamWriter.Flush();
            }
        }
    }
}
