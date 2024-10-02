interface ButtonType {
  type: 'button' | 'submit'
  name: string
  onClick?: () => unknown
  children: React.ReactNode
  styles?: string
  disabled?: boolean
}

export default function ButtonComponent(props: ButtonType) {
  const {type, name, onClick, children, styles, disabled = false } = props

  return (
    <>
      <button type={type} name={name} className={`${styles && styles}`} onClick={onClick} disabled={disabled}>{children}</button>
    </>
  )
}