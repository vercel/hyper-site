export default icon => ({ size = 24, height, width, onClick, className }) => {
  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      fill="currentColor"
      onClick={onClick}
      className={className}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  )
}
