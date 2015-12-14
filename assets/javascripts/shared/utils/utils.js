export function formatDate(date){
  let m = date.getMonth() + 1;
  m = "0"+m;
  m = m.substr(-2)
  let d = "0"+date.getDate();
  d = d.substr(-2)
  let y = date.getFullYear();
  return d + '-' + m + '-' + y;
}
