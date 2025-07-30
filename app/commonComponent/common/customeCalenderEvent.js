import React, { memo, useState,useEffect,useContext} from 'react';
import { Calendar } from '../../CommonComponents/src/components/Calendar';
import { UserContext } from '../../MainScreen/MainScreen';
import moment from 'moment';
import { Dimensions } from 'react-native';

const EventsData = () => {

 const { events, setSelectedKeyIndex ,setBookedEvents,setVisible} = useContext(UserContext);
  const [scrollOffsetMinutes, setScrollOffsetMinutes] = useState(0);
  
  useEffect(() => {   
    const interval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      let scrollPosition;
      if (currentHour < 20) {
        scrollPosition = ((currentHour - 3) * 60) + currentMinute;
      } else {
        scrollPosition = ((currentHour) * 60) + currentMinute;
      }
      setScrollOffsetMinutes(scrollPosition);     
    }, 15000); // 30 seconds interval

    return () => {
      clearInterval(interval);
    };
  })

  const handleCalender = (key) => {
    var presentEvents = events?.filter((items, index) => { 
      return key === parseInt(moment.utc(items.start).local().format('H')) || key === parseInt(moment.utc(items.end).local().subtract(5, 'seconds').format('H'))
    });
    setBookedEvents(presentEvents);
    setSelectedKeyIndex(key)
    setVisible(true);
  }



  return (
    <Calendar
      hourRowHeight={Dimensions.get('window').width / 10}
      events={events}
      height={600}
      mode='day'
      ampm={true}
      swipeEnabled={false}
      hourStyle={{ color: "#000000", fontWeight: "bold", bottom: 10}}
      headerContainerStyle={{ height: 0 }}
      dayHeaderStyle={{ height: 0 }}
      headerComponentStyle={{ height: 0 }}
      weekDayHeaderHighlightColor='#FFFFFF'
      hideNowIndicator
      scrollOffsetMinutes={scrollOffsetMinutes}
      isEventOrderingEnabled
      showTimeColumnDivider={true}
      bodyContainerStyle={{ backgroundColor: "#FFFFFF" }}
      calendarCellStyle={{ borderColor: "#D3D3D3", borderWidth: 1 }}
      eventCellStyle={{ backgroundColor: 'rgb(255, 153, 153)' }}
      onretract={(e) => handleCalender(e)}
      
  />
  ) 
}

export default memo(EventsData);