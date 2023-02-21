import { useEffect, useState } from "react";
import { format, isToday, isYesterday } from 'date-fns'
import { DataTableComponent } from "./dataTable/data-table"
import restActions from '../actions/rest'
import {getName} from "../actions/general"
const apiData = []
export const ResultData = (props) => {
  const data = new Date();
  const [selectMonth, setMonth] = useState(data.getMonth()+1);
  const [selectYear, SetYear] = useState(data.getFullYear());
  const [allResults, setAllResults] = useState([])
  const cities = []
  const headerData = [
    { title: 'date', fieldName: 'date' },
    { title: 'Result', fieldName: 'Result' }
  ]

  const fetchData = async (month, year) => {
    const url = `/public/lottery?month=${month}&year=${year}`
    const key = 'publishDate'
    try {
      const { data: lotteries } = await restActions.GET(url)
      console.log('Actual count', lotteries.length)
      const arrayUniqueByKey = [...new Map(lotteries.map(item =>
        [item[key], item])).values()];
      setAllResults(arrayUniqueByKey)
      console.log('Unique count', arrayUniqueByKey.length)
    } catch (exception) {
      setAllResults([])
      console.log('Unable to load data!!', exception)
    }

  }


  useEffect(() => {
    fetchData(selectMonth, selectYear);
  }, [])


  const handleClick = (filter) => {

  }
  const getHtml = (data) => {
    if (data.length > 0) {
      return data.map((item, index) => {
        return (
          <tr key={index} style={{ textAlignLast: 'center' }}>
            <td style={{ width: '30%' }}>
              {format(new Date(item.publishDate), "dd-MM-yyyy hh:mm aaaaa'm'")}
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

  const pageCount = Math.ceil(allResults.length / 10)
  const getHeaderHtml = (data) => {
    return (
      <div className="text-center py-2" style={{ backgroundColor: 'aliceblue' }}>
        <div className="col-md-12 col-sm-12 col-xs-12">
          <h2>{data.header}</h2>
          <p><span className="multicolor">{data.brandName}</span></p>
        </div>
      </div>
    )
  }
  const initialHeaderValues = {
    header: getName().HindiHeader,
    brandName: getName().EnglishHeader,
  }

  const SetYearOption = () => {
    const YearList = [2023]
    const data = new Date();
    const currentYear = data.getFullYear()

    for (let index = 2023; index <= currentYear; index++) {
      if (YearList.indexOf(index) < 0) {
        YearList.push(index)
      }
    }
    return YearList


  }

  const setMonthOption = () => {

    const monthData = {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec'
    };
    const monthList = []
    for (const value in monthData) {
      monthList.push({
        value,
        displayValue: monthData[value]
      })
    }
    console.log("monthList", monthList)
    return monthList


  }

  const OnMonthChange = (event) => {
    setMonth(event.target.value)
    fetchData(event.target.value, selectYear);
  }
  const OnSelectedYear = (event) => {
    SetYear(event.target.value)
    fetchData(selectMonth, event.target.value);
  }

  return (
    <>
      {getHeaderHtml(initialHeaderValues)}
      <div className='col-12' style={{
        textAlign: '-webkit-center'
      }}>
        <div className="my-2" style={{
          display: 'inline-flex',
          fontSize: "1em",
          color: "#32e0c4",
          cursor: "pointer",
          backgroundColor: "gainsboro",
          borderRadius: '0.375rem'
        }} >

          <div>

            <select className="custom-select" style={{ width: '200px' }} value={selectMonth} onChange={OnMonthChange}  >

              {setMonthOption().map((item, i) => {
                return (
                  <option key={i} value={item.value}>{item.displayValue}</option>
                )
              })}
            </select>


            <select

              className="custom-select" style={{ width: '200px' }}
              value={selectYear}
              onChange={OnSelectedYear}
            >
              {SetYearOption().map((item, i) => {
                return (
                  <option key={i} value={item}>{item}</option>
                )
              })}
            </select>

          </div>
        </div>
      </div>
      <DataTableComponent
        search={false}
        filter={{
          search: '',
          sortBy: 'date',
          orderBy: 'ASC',
          pageOffset: 0,
          itemPerPage: 10
        }}
        loader={false}
        headerData={headerData}
        html={getHtml(allResults)}
        count={allResults.length}
        pageCount={pageCount}
        // navigate={this.props.navigate} 
        // loader={this.props.loader} 
        data={allResults}
        handleClick={handleClick}
      // parentCheck={this.props.parentCheck}
      // isSelect={this.props.isSelect}
      // onParentSelect={this.props.onParentSelect}
      // parentCheckBoxId={this.props.parentCheckBoxId}
      />

    </>
  )
}