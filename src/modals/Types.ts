import { ChangeEvent, Dispatch, InputHTMLAttributes, ReactNode, SetStateAction, SyntheticEvent } from "react"
import SupaError from "./Error"

export interface Goods {
	good_id: number
  title: string
  price: number
  color: string
  type: number
  quantity: number
  icon: string
}

export type CartItem = {
  cart_id: string
  good_id: number
  order_id: number
  quantity: number
  goods: Goods
}

export interface Cashier {
  cashier_id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  user_id: string;
  on_duty: boolean;
  email: string;
}

export interface  CartContextValues {
  cart: CartItem[]
  create: (goods: Goods) => void
  remove: (goodId: number) => void
  increment: (goodId: number) => void
  decrement: (goodId: number) => void
  pay: (cb: () => void, price: number) => void
  clearCart: () => void
  orderId: number | null
}

export interface ActionModalProps {
  userId: string
  email: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export interface Error {
  login: SupaError
  logout: SupaError
}


export interface CartItemProps {
  data: {
    cart_id: number
    order_id: number
    good_id: number
    goods: Goods
    quantity: number
  }
}

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value?: string;
  isError?: string;
  placeholder?: string;
  type?: string;
  icon?: string;
  isFocus?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IconProps {
  width: string
  height: string
  color?: string
  path: string
  className?: string
  onClick?: () => void
}

export interface ModalProps {
  isOpen: boolean
  children: ReactNode
}

export interface PopoverProps {
  children: React.ReactNode
  isOpen: boolean
  triggerRef: React.RefObject<HTMLButtonElement>
}


export interface CartInputProps {
  submitDiscount: (e: SyntheticEvent) => void
  discountValue: string
  setDiscountValue: (value: string) => void
  setIsDiscountActive: (value: boolean) => void
}

export interface CartButtonProps {
  handlRefresh: () => void
  pay: () => Promise<void>
  isClicked: boolean
}
export interface ActionModalPropsCart {
  userId: string
  email: string
  
}

export interface Data {
  good_id: number
  title: string
  price: number
  color: string
  type: number
  quantity: number
  icon: string
}
export interface ProductCardSetBgProps {
  data: Goods
  isSelected: boolean
}


export interface CahierAcountProps {
  cashiers: any
  cashierIsLoading: boolean
  ordersCount: number
  cart: CartItem[]
}

export interface CartState {
  cart: CartItem[]
  isHidden: boolean
  discountTaken: number
  orderId: number | null
  discount: number
  cartPay: boolean
  email: string
  password: string
  isError: string
  popoverIsOpen: boolean
  modalIsOpen: boolean
  userId: string
  ordersCount: number
  totalOrdersCount: number
  emailCahier: string
}

export interface SearchProps {
  width: string
  height: string
  className?: string
}

export interface CashierModalProps {
  setPopoverIsOpen: (isOpen: boolean) => void
  popoverTriggerRef: React.RefObject<HTMLButtonElement>
}

export interface PopoverCashierProps {
  avatar: string
  title: string
  onClick?: () => void
}

export interface SectionProps {
  isActive: boolean
  children: ReactNode
  pathIcon: string
  to: string
}

export interface Option {
  value: string
  label: string
  link: string
}

export const OPTIONS: Option[] = [
  { value: 'Cash', label: 'Cash', link: 'dolar.svg' },
  { value: 'Debit Card', label: 'Debit Card', link: 'ion_card.svg' },
  { value: 'E-Wallet', label: 'E-Wallet', link: 'qr.svg' },
]


export interface DataMain {
  good_id: number
  title: string
  price: number
  color: string
  type: number
  quantity: number
  icon: string
}


export interface PopoverItemProps {
  icon: string
  title: string
  onClick?: () => void
}

export interface CardCounterProps {
  data: Goods
  isSelected: boolean
  currentItem: any
}