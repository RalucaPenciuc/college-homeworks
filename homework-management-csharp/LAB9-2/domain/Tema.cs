using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.domain
{
    class Tema : IHasID<string>
    {
        public string Id { get; set; }
        public string Descriere { get; set; }
        public int Deadline { get; set; }
        public int Startline { get; set; }

        public Tema(string Id, string Descriere, int Deadline, int Startline)
        {
            this.Id = Id;
            this.Descriere = Descriere;
            this.Deadline = Deadline;
            this.Startline = Startline;
        }

        public override string ToString()
        {
            return "Id<" + Id + "> Descriere<" + Descriere + "> Deadline<" + Deadline + "> Startline<" + Startline + ">";
        }

        public override bool Equals(object obj)
        {
            var tema = obj as Tema;
            return tema != null && Id == tema.Id;
        }

        public override int GetHashCode()
        {
            return 2108858624 + EqualityComparer<string>.Default.GetHashCode(Id);
        }
    }
}
