import React, { useState, useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import Input from 'shared/Input/Input'
import reserved from '../../images/reserved6.jpg'
import Label from 'components/Label/Label'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DateInput from './DateInput'
import GuestsInput from './GuestsInput'
import TimeInput from './TimeInput'
import ButtonPrimary from 'shared/Button/ButtonPrimary'
import NcImage from 'shared/NcImage/NcImage'
import Avatar from 'shared/Avatar/Avatar'
import { getRestaurantApi } from 'services/apiServices'
import { checkTableAvailability, reserveTable } from 'services/reservationServices'
import moment from 'moment'
import Swal, { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Heading from 'components/Heading/Heading'
import NoteInput from './NoteInput'

const MySwal = withReactContent(Swal);

const TableReservation = () => {

 const { id } = useParams();
 const navigate = useNavigate();

 const user_id = useSelector((state:any) => state.auth.user.id)

 const [dateValue, setdateValue] = useState<moment.Moment | null>(null);
 const [dateFocused, setDateFocused] = useState<boolean>(false);

 const [startTimeValue, setStartTimeValue] = useState<any>("10:00 AM");
 const [endTimeValue, setEndTimeValue] = useState<any>("11:00 AM");

 const [loading, setLoading] = useState<boolean>(false)
 const [validTimeGap, setValidTimeGap] = useState<boolean>(true)

 const [guestValue, setGuestValue] = useState({});

 const [note, setNote] = useState("");

 const [restaurantData, setRestaurantData] = useState<any>({});
 const [timezone, setTimezone] = useState<any>("Europe/Rome")

 const getRestaurantData = async() => {
    const response = await getRestaurantApi(id);
    if(response.data.response === "success"){
        setRestaurantData(response.data.restaurant[0])
    }else{
        navigate('/')
    }
 }

 const getTimeZone = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { timeZoneName: 'long' };
    const formatter = new Intl.DateTimeFormat(undefined, options);
    const parts = formatter.formatToParts(date);
    const timezoneName = parts.find(part => part.type === 'timeZoneName')?.value;
    // setTimezone(timezoneName);
 }

 const checkTotalSeats = (table_arr:any, guestValue: any) => {
    const totalGuests = guestValue.guestAdults + guestValue.guestChildren
    const totalSeats = table_arr.reduce((acc:any, curr:any) => acc + curr.seat_count, 0);

    if(totalSeats >= totalGuests){
        bookTable(table_arr, totalGuests, totalGuests)
    }else{
        renderEmptyMessage()
    }
    // console.log(totalSeats)
 }


  const bookTable = (tables: any, requiredSeats: number, totalGuests: number) => {
    var selectedTables: any = [];

    while(requiredSeats > 0) {
        let availableTables = tables.filter((table: any) => !selectedTables.includes(table) && table.seat_count >= requiredSeats);
        let closestTable = availableTables.reduce((prev: any, curr: any) => {
            return curr.seat_count < prev.seat_count ? curr : prev;
        }, availableTables[0]); // add initial value to reduce()
        if (!closestTable) {
            // If no tables can accommodate the remaining guests, select the table with the highest seat count that is not a duplicate
            let availableTablesNoDuplicates = tables.filter((table: any) => !selectedTables.includes(table));
            let maxSeatTable = availableTablesNoDuplicates.reduce((prev: any, curr: any) => {
                return curr.seat_count > prev.seat_count ? curr : prev;
            }, availableTablesNoDuplicates[0]); // add initial value to reduce()
            selectedTables.push(maxSeatTable);
            requiredSeats -= maxSeatTable.seat_count;
        } else {
            selectedTables.push(closestTable);
            requiredSeats -= closestTable.seat_count;
        }
        
    }

    // console.log(selectedTables.filter((value: any, index: number, self: any) => self.indexOf(value) === index));
    // console.log(note)

    tableReservation(selectedTables,totalGuests)
  };


  const tableReservation = async(selectedTables: any, totalGuests:number) => {
    
    const table_ids = selectedTables.map((obj:any) => obj.id);

    const date = dateValue?.format("YYYY-MM-DD")
    const start_moment = moment(`${date} ${startTimeValue}`, "YYYY-MM-DD h:mm A");
    const res_from = start_moment.format("YYYY-MM-DD HH:mm:ss");
    const end_moment = moment(`${date} ${endTimeValue}`, "YYYY-MM-DD h:mm A");
    const res_to = end_moment.format("YYYY-MM-DD HH:mm:ss");

    const data = {
        table_ids: table_ids,
        user_id: user_id,
        guests_count: totalGuests,
        reservation_date: date,
        reservation_from: res_from,
        reservation_to: res_to,
        timezone: timezone,
        note: note
    }
    const response = await reserveTable(id,data);
    if(response.data.response === "success"){
        renderAvailableTables(response.data.data, response.data.qrcode, selectedTables)
    }else{
        renderEmptyMessage();
    }
    
    // console.log(response.data) 
  }
  

 const checkAvailability = async() => {
    setLoading(true)
    const date = dateValue?.format("YYYY-MM-DD")
    const start_moment = moment(`${date} ${startTimeValue}`, "YYYY-MM-DD h:mm A");
    const res_from = start_moment.format("YYYY-MM-DD HH:mm:ss");
    const end_moment = moment(`${date} ${endTimeValue}`, "YYYY-MM-DD h:mm A");
    const res_to = end_moment.format("YYYY-MM-DD HH:mm:ss");

    const data = {
        reservation_date: date,
        reservation_from: res_from,
        reservation_to: res_to,
        timezone: timezone
    }
    const response = await checkTableAvailability(id,data)
    if(response.data.response === "success"){
        checkTotalSeats(response.data.tables, guestValue)
        // renderEmptyMessage()
        // renderAvailableTables(response.data.tables)
        setLoading(false)
    }else{
        renderEmptyMessage()
        setLoading(false)
    }
 }

 const handleOnSubmit = (e:any) => {
    e.preventDefault()
    getTimeZone()
    checkAvailability()
 }

 useEffect(() => {
    getRestaurantData()
    if(!user_id){
        navigate('/login')
    }
 },[])

 const convertToMinutesPastMidnight = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(parseFloat);
    const isPM = timeString.includes("PM");
    let totalMinutes = (hours % 12) * 60 + minutes;
    if (hours === 12 && !isPM) {
      totalMinutes = 0;
    } else if (isPM) {
      totalMinutes += 12 * 60;
    }
    return totalMinutes;
  }

 useEffect(() => {
    if(convertToMinutesPastMidnight(startTimeValue) < convertToMinutesPastMidnight(endTimeValue)){
        setValidTimeGap(true)
    }else{
        setValidTimeGap(false)
    }
 },[startTimeValue, endTimeValue])

    const downloadQr = (qr_url:any, filename:any) => {
        const link = document.createElement("a");
        link.href = qr_url;
        link.download = filename;
        link.click();
    };

    const renderAvailableTables = (reservation:any,qrcode:string,selectedTables:any) => {

        MySwal.fire({
            
            title: <Heading children="Reservation Confirmed" className='text-neutral-900 text-xl mt-6' isCenter={true} />,
            // text: "Table reserved successfully.",
            html: (
                <div> 
                    <Avatar sizeClass="w-60 h-60" radius="rounded" imgUrl={qrcode}/>
                    <p>Date : {reservation.reservation_date}</p>
                    <p>Time : {startTimeValue} - {endTimeValue}</p>
                    <p>Guests : {reservation.guests_count}</p>
                    <p>Note : {reservation.note}</p>
                    <p>Reserved Tables : {" "}
                        {selectedTables.map((item:any,key:number) => {
                            console.log(item)
                            if(selectedTables.length === key+1){
                                return item.table_no
                            }
                            return ( item.table_no + ", ")
                        })}
                        {/* {reservation.table_ids} */}
                    </p>
                    
                {/* <img src={qrcode} alt="" /> */}
                {/* <p>Following tables are booked.</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {tables.map((item:any, index: number) => {                   
                        return (
                            <div className='flex flex-row p-3 rounded-xl border border-neutral-200 dark:border-neutral-800'>
                                <p>{item.table_no}</p>
                                <p>{item.table_type}</p>
                                <p>{item.seat_count}</p>
                            </div>
                        )
                    })}
                
                </div> */}
                {/* <p className='mt-4 text-neutral-400' style={{fontSize:"13px"}}>If you do not require any addons, simply leave the checkboxes blank and proceed to add to cart.</p> */}
                </div>
            ),
            confirmButtonText: `Download QR`,
            confirmButtonColor: 'green',
            // preConfirm: () => {
            //     return selectedArray;
            // }
        }).then((result: SweetAlertResult<any>) => {
            if (result.isConfirmed){
                downloadQr(
                    qrcode,
                    `QR Code - Reservation ${reservation.id}`
                )
            }
            navigate('/myorders')
            // window.location.reload();
        })
    }

    const renderEmptyMessage = () => {
        MySwal.fire({
            icon: "error",
            title: "Oops",
            text: "Sorry, we do not have enough tables to accommodate your party. Please adjust your time slot or guests value.",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: "Close",
            cancelButtonColor: 'rgba(218, 0, 0, 1)'
        })
    }
 

    const renderContent = () => {

        return (
            <div className="w-full flex flex-col md:rounded-2xl  md:shadow-xl md:border md:border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-row ">
                    <img src={reserved} className="w-full hidden md:flex md:w-4/12 rounded-l-2xl" />
                    <form className="w-full md:w-8/12 flex justify-center p-2 md:p-20" onSubmit={handleOnSubmit}>
                        <div className="text-center w-full md:pt-10">
                            <h2 className="text-xl md:text-4xl font-semibold mt-2 md:mt-0">Make a Reservation</h2>
                            <hr className={`flex justify-center mt-1 md:mt-2 pb-10`}/>

                            <div className="flex-1 flex relative rounded-xl space-x-4 bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-800  p-5">
                                <Avatar sizeClass="w-20 h-20 md:w-28 md:h-28 " radius="rounded" imgUrl={restaurantData.avatar}/>
                                
                                {/* <p className='font-semibold text-primary-500'>Burger King</p> */}
                                <div className='flex flex-col text-left'>
                                    <p className='font-semibold mb-2'>{restaurantData.name}</p>
                                    <p className='font-light text-xs text-neutral-500 dark:text-neutral-400'>{restaurantData.description}</p>
                                    {/* <p className='font-light text-xs text-neutral-500 dark:text-neutral-400'>Address : {restaurantData.email}</p> */}
                                    <p className='font-light text-xs text-neutral-500 dark:text-neutral-400'>Email : {restaurantData.email}</p>
                                    <p className='font-light text-xs text-neutral-500 dark:text-neutral-400'>Phone : {restaurantData.phone_no}</p>
                                </div>
                            </div>

                            <DateInput
                                defaultValue={dateValue}
                                onChange={(date) => setdateValue(date)}
                                defaultFocus={dateFocused}
                                onFocusChange={(focus: boolean) => {
                                    setDateFocused(focus);
                                }}
                                className="flex-1 mt-4 mb-4"
                            />

                            <div className="flex flex row  mt-4 mb-4">
                            <TimeInput
                                defaultValue={startTimeValue}
                                onChange={(data) => setStartTimeValue(data)}
                                className="flex-[1.5] mr-2"
                                buttonSubmitHref="/listing-experiences"
                                type="From"
                                isValid={validTimeGap}
                            />

                            <TimeInput
                                defaultValue={endTimeValue}
                                onChange={(data) => setEndTimeValue(data)}
                                className="flex-[1.5] ml-2"
                                buttonSubmitHref="/listing-experiences"
                                type="To"
                                isValid={validTimeGap}
                            />
                            </div>

                            <GuestsInput
                                defaultValue={guestValue}
                                onChange={(data) => setGuestValue(data)}
                                className="flex-[1.5]  mt-4 mb-4"
                                buttonSubmitHref="/listing-experiences"
                            />

                            <NoteInput 
                                defaultValue={note}
                                onChange={(data) => setNote(data)}
                                className="flex-[1.5]  mt-4 mb-4"
                                buttonSubmitHref="/listing-experiences"
                            />

                            <ButtonPrimary className='mt-3 mb-3 md:mt-6 md:mb-0 rounded-xl disabled:bg-neutral-500' loading={loading} disabled={dateValue && validTimeGap && Object.keys(guestValue).length !== 0 ? false : true}>Search Slot</ButtonPrimary>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
  return (
    <div className="container mt-11 mb-24 lg:mb-32 ">
        <div className="w-full mx-auto">    
            {renderContent()}
        </div>
    </div>
  )
}

export default TableReservation