import './house.css'
interface Props {
  houselist: HouseItem[];
}
interface HouseItem {
  title: string;
  address: string;
  price: number;
  img: string;
  tag: string[];
}
function HouseList(props: Props) {
  const lists = props.houselist;
  const listItems = lists.map( (item: HouseItem, index) =>
    <li className="houseItem" key={ index }>
      <img className="houseImg" src={ item.img } alt={ item.title } />
      <div className="houseInfo">
        <p className="houseName">{ item.title }</p>
        <p className="houseAddress">{ item.address }</p>
        <p className="housePrice">{ item.price } 元/月</p>
        <p className="houseTag">
          {
            item.tag.map( (tag,i) => {
              return ( <span className="tag" key={i}>{ tag }</span> )
            })
          }
        </p>
      </div>
    </li>
  );
  return (
    <ul className="houstList">{listItems}</ul>
  );
}
export default HouseList;

