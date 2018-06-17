export default function selectText(element) {
  let range
  let selection
  if (document.body.createTextRange) {
    //ms
    range = document.body.createTextRange()
    range.moveToElementText(element)
    range.select()
  } else if (window.getSelection) {
    //all others
    selection = window.getSelection()
    range = document.createRange()
    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  return selection.toString() || range.toString()
}
