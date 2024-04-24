import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  DropdownItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
} from '@nextui-org/react';
import { Input } from '@nextui-org/input';
import { SearchIcon } from '@/components/NavigationBar/SearchIcon';
import ProfileIcon from '@/components/NavigationBar/ProfileIcon';
export default function NavBar() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className={'font-bold text-[30px] text-[#1F1F21]'}>Nex</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify={'center'}>
        <NavbarItem>Home</NavbarItem>
        <NavbarItem>About</NavbarItem>
        <NavbarItem>Services</NavbarItem>
        <NavbarItem>Contact</NavbarItem>
      </NavbarContent>

      <NavbarContent justify={'end'}>
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[10rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <ProfileIcon />
      </NavbarContent>
    </Navbar>
  );
}
