import { useEffect, useState } from "react";
import { format, isToday, isYesterday } from 'date-fns'
import { DataTableComponent } from "./dataTable/data-table"
import restActions from '../actions/rest'
import logo from '../images/new.gif'
import illusion from '../images/advertising.jpeg'
const initialHeaderValues = {
  header: 'बीकानेर सट्टा बाज़ार',
  subHeading: 'आज का बाजार भाव',
  brandName: 'Your brand name can come here!',
  oldCode: '',
  newCode: '',
  tableHeader: 'बीकानेर सट्टा बाज़ार लॉटरी चार्ट दिसंबर 2023',
  tableResultTime: format(new Date(), "hh:mm aaaaa'm'")
}

const Card = (props) => {
  const { title, desc, updated, img } = props
  return (
    <div className="card" >
      {
        title &&
        <div className="card-header">{title}</div>
      }
      {
        <div className="card-body" style={{ alignSelf: 'center' }}>
          {img && <img src={illusion} width="90%" />}
          {desc && <p className="card-text" >{desc}</p>}
        </div>
      }
      {/* {
    updated &&
    <div className="card-footer small">
     {moment(updated).format('DD MMM YYYY')}
    </div>
   } */}
    </div>
  )
}
const apiData =[]
let oldDetail = []
for (let i = 23; i < 24; i++) {
  oldDetail.push({ desc: `Bikaner Satta King Chart 20${i}` })
}
let oldDataWithCity = []
for (let i = 0; i < [...new Set(...apiData.map(x => x.cities.map(y => y.name)))].length; i++) {
  const element = [...new Set(...apiData.map(x => x.cities.map(y => y.name)))][i];
  oldDataWithCity.push({ desc: ` Bikaner Satta King Chart ${element}` })
}

export const Home = () => {
  const [oldDataWithCityDetail, setOldDataWithCityDetail] = useState(oldDataWithCity);
  const [oldDataDetail, setDataOldDetail] = useState(oldDetail);
  const [brandName, SetBrandName] = useState('')
  const [homeData, setHomeData] = useState(initialHeaderValues);
  const [yesterdayCode, setYesterdayCode] = useState('')
  const [todayCode, setTodayCode] = useState('')
  const [allResults, setAllResults] = useState([])
  const getHeaderHtml = (data) => {
    return (
      <div className="text-center py-2" style={{ backgroundColor: '#c3dbf1' }}>
        <div className="col-md-12 col-sm-12 col-xs-12">
          <h2>{data.header}</h2>
          <p><span className="multicolor">{data.brandName}</span></p>
          <p>
            <span className="">
              <span className="mx-2"> Old : <span style={{ "color": "#c71557" }}>{data.oldCode}</span> </span>
              <span className="mx-2"> New : <span style={{ "color": "#c71557" }}> {data.newCode}</span></span>
              <span className="mx-2"> <img src={logo} alt={data.brandName} style={{ width: "50px", height: "45px" }} /> </span>
            </span>
          </p>
        </div>
      </div>
    )
  }

  const filterData = (items) => {
    if(items.length>0){
      SetBrandName(items[0].lotteryName)
    }
        items.forEach((item) => {
      if (isYesterday(new Date(item.publishDate))) {
        console.log('found yesterday date and code')
        setYesterdayCode(item.code)
      }
      if (isToday(new Date(item.publishDate))) {
        console.log('found todays date and code')
        setTodayCode(item.code)
      }
    })
  }

  const fetchData = async () => {
    const url = '/public/lottery'
    const key = 'publishDate'
    try {
      const { data: lotteries } = await restActions.GET(url)
      console.log('Actual count', lotteries.length)
      const arrayUniqueByKey = [...new Map(lotteries.map(item =>
        [item[key], item])).values()];
      setAllResults(arrayUniqueByKey)
      filterData(arrayUniqueByKey)
      console.log('Unique count', arrayUniqueByKey.length)
    } catch (exception) {
      setHomeData([])
      console.log('Unable to load data!!', exception)
    }

  }

  useEffect(() => {
    fetchData();
  }, [])
  const getHtml = (data) => {
    if (data.length > 0) {
      return data.map((item, index) => {
        return (
          <tr key={index} style={{ textAlignLast: 'center' }}>
            <td style={{ width: '30%' }}>
              {format(new Date(item.publishDate),  "dd-MM-yyyy hh:mm aaaaa'm'")}
            </td>
            <td style={{ width: '30%' }}>
              {item.code}
            </td>
          </tr>
        )
      })
    } else {
      return ''
    }
  }
  return (
    <>
      {getHeaderHtml({ ...homeData, oldCode: yesterdayCode, newCode: todayCode ,brandName})}

      {/* <div className="row" > */}
      <div className="row mx-2 px-5 " >
      {[{ img: true }, { img: true }].map(x => (
          <div className="col-sm-6 col-md-3 my-2 ">
            {Card(x)}
          </div>
        ))}
      </div>
      {/* </div> */}
      <div className="mx-3 my-2" style={{ backgroundColor: '#c3dbf1' }}>
        <div className='pt-2 px-3'>
          <h4>{initialHeaderValues.tableHeader}</h4>
          <h3 className='pt-2 px-3'>Result Time: {initialHeaderValues.tableResultTime}</h3>
        </div>
        <div className='px-1'>
          <DataTableComponent
            loader={false}
            headerData={[
              { title: 'Date', fieldName: 'date' },
              { title: 'results', fieldName: 'result' }
            ]}
            html={getHtml(allResults)}
          />
        </div>
      </div>
      <div className="row mx-3 my-5 py-2 px-2" style={{ backgroundColor: '#c3dbf1' }}>
        {oldDataDetail.map(x => (
          <div className="col-sm-3 col-md-3 my-2">
            {Card(x)}
          </div>
        ))}
       <div className='px-2 mt-5'>
          <p>Bikaner Satta King Result Chart 2022</p>
          <p>Results for Bikaner Satta King, Bikaner Satta King game, new result for Bikaner, old result for Bikaner Satta King game, king sBikaner game chart 2022, Bikaner Satta King result record chart for today, king Bikaner Satta King, Bikaner Satta King result, Bikaner Satta King king, king Bikaner Satta King result, Bikaner Satta King number, king Bikaner Satta King chart, Bikaner Satta Kingresult, Bikaner Satta Kingbazar, Bikaner Satta KingSatta and all game results can be found here monthly. We have monthly and yearly bashed results data and its update only from the company authorized members. Please bookmark this website page and get the update on time. Hope you enjoy your game and earn money without any issue, if you have any query or problem feel free to contact with our Khaiwal or online playing person we will work on your query and will short out very soon.
            Thank you for providing your bless and love to the Bikaner.</p>
        </div>
      </div>
  
      {oldDataWithCityDetail && oldDataWithCityDetail.length ?
        <div className="row mx-3 my-5 py-2 px-2" style={{ backgroundColor: '#c3dbf1' }}>
        {oldDataWithCityDetail.map(x => (
          <div className="col-sm-3 col-md-3 my-2 ">
            {Card(x)}
          </div>
          ))}
        </div> : ''}
      
    </>

  )
}