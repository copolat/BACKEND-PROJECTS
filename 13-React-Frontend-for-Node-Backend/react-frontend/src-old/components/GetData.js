function handleClick(){
  console.log('It works')
  const url = 'http://127.0.0.1:5000/api/customers';
  fetch(url)
  .then((response) => response.json())
  .then((data) => console.log('This is your data', data));

}
function GetData() {
    return (
        <button type= 'button'onClick={handleClick}> Show all data</button>
    )
}

export default GetData;