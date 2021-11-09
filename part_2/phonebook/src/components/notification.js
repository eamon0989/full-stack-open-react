export const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderRadius: 5,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: '10px',
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderRadius: 5,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: '10px',
  }

  if (message === null) {
    return null
  }

  if (message.includes('removed')) {
    return (
      <div className="notification" style={errorStyle}>
        {message}
      </div>
    )
  } else {
    return (
      <div className="notification" style={notificationStyle}>
        {message}
      </div>
    )
  }
}