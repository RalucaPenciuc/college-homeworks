using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.domain
{
    interface IHasID<ID>
    {
        ID Id { get; set; }
    }
}
