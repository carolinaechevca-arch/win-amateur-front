import './Brand.css'

interface BrandProps {
  inverse?: boolean
}

export function Brand({ inverse = false }: BrandProps) {
  return (
    <a className={`brand ${inverse ? 'brand--inverse' : ''}`} href="/" aria-label="Win Amateur, inicio">
      <svg aria-hidden="true" className="brand__mark" viewBox="0 0 42 42">
        <path d="M21 3 36 8.3v10.9c0 8.9-5.8 15.8-15 19.1C11.8 35 6 28.1 6 19.2V8.3L21 3Z" />
        <path d="m13.5 15.2 3.9 12.2 3.7-7.5 3.8 7.5 3.8-12.2" />
      </svg>
      <span>WIN <strong>AMATEUR</strong></span>
    </a>
  )
}
