using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services
{
    public class ComponentService
    {
        private StackBurgerContext context;

        public ComponentService(StackBurgerContext _context)
        {
            context = _context;
        }

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

        public async Task<List<Component>> Get()
        {
            List<Component> components = null;
            try
            {
                components = await context.Components.ToListAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return components;
        }
    }
}
