using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.validation
{
    interface IValidator<E>
    {
        void Validate(E Entity);
    }
}
