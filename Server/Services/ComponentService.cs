using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Server.Models;

namespace Server.Services
{
    public class ComponentService
    {
        public static Component GetbyId(Guid id)
        {
            Component component;
            /*try
            {
                component = ContextHolder.context.Components.FirstOrDefault(c => c.Id == id);
            }
            catch
            {
                return null;
            }*/
            return null;
        }
    }
}
