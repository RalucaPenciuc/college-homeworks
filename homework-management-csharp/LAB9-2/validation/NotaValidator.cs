using LAB9_2.domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.validation
{
    class NotaValidator : IValidator<Nota>
    {
        public void Validate(Nota nota)
        {
            if (nota.Id.Key.Id == null || nota.Id.Key.Id.Equals("")) throw new ValidationException("ID Student invalid! \n");
            if (nota.Id.Value.Id == null || nota.Id.Value.Id.Equals("")) throw new ValidationException("ID Tema invalid! \n");
            if (nota.Valoare < 0 || nota.Valoare > 10) throw new ValidationException("Nota invalida! \n");
            if (nota.SaptamanaPredare < 1 || nota.SaptamanaPredare > 14) throw new ValidationException("Saptamana de predare invalida! \n");
        }
    }
}
