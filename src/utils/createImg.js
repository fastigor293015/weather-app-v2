const createImg = ({ src = '', className = '', alt = '', style }) => {
  return (<img className={className} src={src} alt={alt} style={style} />)
}
export default createImg;