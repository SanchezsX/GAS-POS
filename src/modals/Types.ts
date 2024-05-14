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
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
  children: ReactNode
}

export interface PopoverProps {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLButtonElement>
}


export interface CartInputProps {
  submitDiscount: (e: SyntheticEvent) => void
  discountValue: string
  setDiscountValue: (value: string) => void
  setIsDiscountActive: (value: boolean) => void
}

export interface CartButtonProps {
  handleClick: () => void
  payWithDiscount: () => void
  isClicked: boolean
}
export interface ActionModalPropsCart {
  userId: string
  email: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
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
  create: (data: Goods) => void
  isSelected: boolean
}


export interface CahierAcountProps {
  cashiers: any
  cashierIsLoading: boolean
  ordersCount: number
  cart: CartItem[]
}

