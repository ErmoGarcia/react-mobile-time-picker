# React Mobile Time Picker

A mobile style time picker for your React app.

## Install

```showcase
npm install react-mobile-time-picker
```

## Usage

```showcase
  import MobileTimePicker from 'react-mobile-time-picker'

  <MobileTimePicker />
```

![Example](react-mobile-time-picker.gif "Example")

You can use onChange to get new values

```showcase
  const [selectedTime, setSelectedTime] = useState()

  <MobileTimePicker onChange={setSelectedTime} />
```

## Custom styles

You can customize the how component looks using the `mobile-time-picker` and `time-option classes`. For example:

