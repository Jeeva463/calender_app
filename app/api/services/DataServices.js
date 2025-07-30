const baseURL = `https://chopeai.wegosecure.com/api/`;


const responseBuilder = async (data) => {
  try{
  const json = await data.json();
  //console.log(json);
    return json;
  } catch (error) {
      console.error(error);
      throw error;
  } 
};

const getDeviceDetails = async (data) => {
  try {
    const urlBuilder = `${baseURL}calendar/device/details?deviceId=${data}`;
  const devicelists = await fetch(urlBuilder, { 
    method: 'get', 
    headers: new Headers({
    'Content-type': 'application/json',
    'Authorization': 'Basic YWRtaW46YWxhaTEyMw=='
    }), 
});
    return await responseBuilder(devicelists);
    } catch (error) {
      console.error(error);
    } 
}


const getMeetings = async (data) => {
try {
  const urlBuilder = `${baseURL}panel/meetings?startDate=${data.startDate}&endDate=${data.endDate}&mailId=${data.mailId}`;
  const meetingResponse = await fetch(urlBuilder, { 
    method: 'get', 
    headers: new Headers({
    'Content-type': 'application/json',
    'Authorization': 'Basic YWRtaW46YWxhaTEyMw==',
    'x-token': data.accessToken
    }), 
});
    return await responseBuilder(meetingResponse);
    } catch (error) {
      console.error(error);
    } 
}

const hearbeatService = async (data) => {
  try {
    const urlBuilder = `${baseURL}calendar/heartbeat?mailId=${data.roomMail}&memory=${data.memory}`;
    //const urlBuilder = `${baseURL}calendar/heartbeat?mailId=${data.roomMail}&memory=${data.memory}&deviceId=${data.deviceId}`;
    const heartBeatResponse = await fetch(urlBuilder, { 
    method: 'get', 
    headers: new Headers({
    'Content-type': 'application/json',
    'Authorization': 'Basic YWRtaW46YWxhaTEyMw==',
    }), 
});
    return await responseBuilder(heartBeatResponse);
    } catch (error) {
      console.error(error);
    } 
}

const getMeetingRooms = async () => {
  try {
    const urlBuilder = `${baseURL}calendar/room/details`;
    const meetingRoomLists = await fetch(urlBuilder, {
     method: 'get',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Basic YWRtaW46YWxhaTEyMw==',
     }
   });
  return await responseBuilder(meetingRoomLists);
   } catch (error) {
     console.error(error);
   } 
}

const linkRoom = async (data) => {
  try {
    const urlBuilder = `${baseURL}calendar/room/link`;
    const linkRoomDetails = await fetch(urlBuilder, {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Basic YWRtaW46YWxhaTEyMw==',
     },
     body: JSON.stringify(data)
   });
  return await responseBuilder(linkRoomDetails);
   } catch (error) {
     console.error(error);
   } 
};

const createMeeting = async (data) => {
  try {
     const urlBuilder = `${baseURL}room/book/panel`;
     const meetinCreation = await fetch(urlBuilder, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWxhaTEyMw==',
      },
      body: JSON.stringify(data)
    });
   return await responseBuilder(meetinCreation);
    } catch (error) {
      console.error(error);
    } 
};

export default {
  getMeetings,
  hearbeatService,
  createMeeting,
  getDeviceDetails,
  getMeetingRooms,
  linkRoom
}
