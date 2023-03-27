using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.validation
{
    class ValidationException : Exception
    {
        public ValidationException(string Exception) : base(Exception) { }
    }
}
