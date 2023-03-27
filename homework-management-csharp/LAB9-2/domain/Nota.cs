using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.domain
{
    class Nota : IHasID<KeyValuePair<Student, Tema>>
    {
        public KeyValuePair<Student, Tema> Id { get; set; }
        public double Valoare;
        public int SaptamanaPredare;
        public string Feedback;

        public Nota(KeyValuePair<Student, Tema> Id, double Valoare, int SaptamanaPredare, string Feedback)
        {
            this.Id = Id;
            this.Valoare = Valoare;
            this.SaptamanaPredare = SaptamanaPredare;
            this.Feedback = Feedback;
        }

        public override string ToString()
        {
            return "IdStudent<" + Id.Key.Id + "> IdTema<" + Id.Value.Id + "> Nota<" + Valoare + "> SaptamanaPredare<" + SaptamanaPredare + "> Feedback<" + Feedback + ">";
        }
    }
}
