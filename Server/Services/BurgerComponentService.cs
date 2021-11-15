using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Server.Models;

namespace Server.Services
{
    public class BurgerComponentService
    {
        public static bool Add(BurgerComponent bc)
        {
            /*try
            {
                context.BurgersComponents.Add(bc);
                context.SaveChanges();
            }
            catch
            {
                return false;
            }*/
            return true;
        }
    }
}
