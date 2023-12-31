import React, { useContext, useState } from 'react'
import styles from './styles.module.css'
import { EventRequestList } from '../../components/eventRequestList'
import eventRequestData from '../../mockData/eventRequestData.json'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'

export default function EventRequest() {

    const {container, gridContainer, title, eventRequestList, listContent, pending, scsApproved, fmFeedback, amApproved, scheduledMeeting, rejected, feedback, selected, buttons, button, submitButton, btnGreen, btnRed} = styles

    const pendingRequests = eventRequestData?.filter((eventRequest) => eventRequest.status === "pending")
    const scsApprovedRequests = eventRequestData?.filter((eventRequest) => eventRequest.status === "scsApproved")
    const rejectedRequests = eventRequestData?.filter((eventRequest) => eventRequest.status === "rejected")
    const fmFeedbackRequests = eventRequestData?.filter((eventRequest) => eventRequest.status === "fmFeedback")
    const amApprovedRequests = eventRequestData?.filter((eventRequest) => eventRequest.status === "amApproved")
    const scheduledMeetingRequests = eventRequestData?.filter((eventRequest) => eventRequest.status === "scheduledMeeting")

    const { userRole } = useContext(UserContext)

    const [selectedItem, setSelectedItem] = useState('')

    const [feedbackValue, setFeedbackValue] = useState('')
    const handleFeedbackChange = (event: any) => {
      setFeedbackValue(event.target.value);
    };

  return (
    <>
    <div className={container}>
    <div className={title}>
          Event Requests
    </div>
    {userRole === 'CS' ?
    <div className={buttons}>
      <Link to="/createEventRequest" className={button}>Create Event Request</Link>
      <Link to="/registerClient" className={button}>Register Client</Link>
    </div> :
    userRole === 'SCS' ?
    <div className={buttons}>
        {selectedItem !== '' && 
        <>
        <div className={selected}>
        Selected Event Request: {selectedItem}
        </div>
        <Link to="/eventRequest" className={button} id={btnGreen}>Approve</Link>
        <Link to="/eventRequest" className={button} id={btnRed}>Reject</Link>
        </>
        }
      <Link to="/eventRequestDetails" className={button}>Event Request Details</Link>
      </div> :
      userRole === 'FM' ?
      <>
      <textarea
        rows={4}         
        cols={50}
        className={feedback}       
        value={feedbackValue}
        onChange={handleFeedbackChange}
        placeholder="Enter your feedback here"
      />
      <div>
        <button className={submitButton} type="submit">Submit</button>
      </div> 
        </> :
      userRole === 'AM' ?
      <div className={buttons}>
        {selectedItem !== '' && 
        <>
      <Link to="/eventRequest" className={button} id={btnGreen}>Approve</Link>
      <Link to="/eventRequest" className={button} id={btnRed}>Reject</Link>
      </>
      }
      </div> : <></>
    }
    <div className={gridContainer}>
      <div className={eventRequestList}>
      <div className={rejected}>
        Rejected
      </div>
      <div className={listContent}>
      {rejectedRequests.length !== 0 ?
        <EventRequestList eventRequests={rejectedRequests} selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> : <div>Empty list</div>}
      </div>
      </div>
      <div className={eventRequestList}>
      <div className={pending}>
        Pending
      </div>
      <div className={listContent}>
      {pendingRequests.length !== 0 ?
        <EventRequestList eventRequests={pendingRequests} selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> : <div>Empty list</div>}
      </div>
      </div>
      <div className={eventRequestList}>
      <div className={scsApproved}>
        SCS Approved
      </div>
      <div className={listContent}>
      {scsApprovedRequests.length !== 0 ?
        <EventRequestList eventRequests={scsApprovedRequests} selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> : <div>Empty list</div>}
      </div>
      </div>
      <div className={eventRequestList}>
      <div className={fmFeedback}>
        FM Feedback
      </div>
      <div className={listContent}>
      {fmFeedbackRequests.length !== 0 ?
        <EventRequestList eventRequests={fmFeedbackRequests} selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> : <div>Empty list</div>}
      </div>
      </div>
      <div className={eventRequestList}>
      <div className={amApproved}>
        AM Approved
      </div>
      <div className={listContent}>
      {amApprovedRequests.length !== 0 ?
        <EventRequestList eventRequests={amApprovedRequests} selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> : <div>Empty list</div>}
      </div>
      </div>
      <div className={eventRequestList}>
      <div className={scheduledMeeting}>
        Scheduled Meeting
      </div>
      <div className={listContent}>
      {scheduledMeetingRequests.length !== 0 ?
        <EventRequestList eventRequests={scheduledMeetingRequests} selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> : <div>Empty list</div>}
      </div>
      </div>
    </div>
    </div>
      </>
  )
}
