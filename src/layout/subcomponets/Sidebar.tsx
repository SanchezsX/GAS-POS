import { useLocation } from 'react-router-dom'
import Section from './Section'

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="bg-sideBg w-[275px] h-[72%] rounded-[39px] p-[20px]">
      <h1 className="font-bold text-[31px] text-center mt-[35px]">GAS POS</h1>
      <div className="flex flex-col justify-between h-[90%]">
        <div className="flex flex-col mt-[45px]">
          <Section
            pathIcon="fuel.svg"
            isActive={location.pathname === '/fuel'}
            to="/fuel"
          >
            Fuel
          </Section>
          <Section
            pathIcon="food.svg"
            isActive={location.pathname === '/food'}
            to="/food"
          >
            Food
          </Section>
          <Section
            pathIcon="drink.svg"
            isActive={location.pathname === '/drink'}
            to="/drink"
          >
            Drinks
          </Section>
        </div>
        <div className="flex flex-col mb-[45px]">
          <Section
            pathIcon="services.svg"
            isActive={location.pathname === '/service'}
            to="/service"
          >
            Service
          </Section>
          <Section
            pathIcon="help.svg"
            isActive={location.pathname === '/help'}
            to="/help"
          >
            Help
          </Section>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
