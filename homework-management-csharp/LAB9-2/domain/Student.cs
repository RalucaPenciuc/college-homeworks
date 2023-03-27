using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.domain
{
    class Student : IHasID<string>
    {
        public string Id { get; set; }
        public string Nume { get; set; }
        public int Grupa { get; set; }

        public Student(string Id, string Nume, int Grupa)
        {
            this.Id = Id;
            this.Nume = Nume;
            this.Grupa = Grupa;
        }

        public override string ToString()
        {
            return "Id<" + Id + "> Nume<" + Nume + "> Grupa<" + Grupa + ">";
        }

        public override bool Equals(object obj)
        {
            var student = obj as Student;
            return student != null && Id == student.Id;
        }

        public override int GetHashCode()
        {
            return 2108858624 + EqualityComparer<string>.Default.GetHashCode(Id);
        }
    }
}
