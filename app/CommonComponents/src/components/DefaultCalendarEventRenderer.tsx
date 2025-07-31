import dayjs from 'dayjs'
import * as React from 'react'
import { Text, TouchableOpacity,Dimensions } from 'react-native'

import { CalendarTouchableOpacityProps, ICalendarEventBase } from '../interfaces'
import { useTheme } from '../theme/ThemeContext'
import { formatStartEnd } from '../utils'
import { Dimensions } from 'react-native'

interface DefaultCalendarEventRendererProps<T extends ICalendarEventBase> {
  touchableOpacityProps: CalendarTouchableOpacityProps
  event: T
  showTime?: boolean
  textColor: string
  ampm: boolean
}

export function DefaultCalendarEventRenderer<T extends ICalendarEventBase>({
  touchableOpacityProps,
  event,
  showTime = true,
  textColor,
  ampm,
}: DefaultCalendarEventRendererProps<T>) {
  const theme = useTheme()
  const eventTimeStyle = { fontSize: theme.typography.xs.fontSize, color: "black" }
  const eventTitleStyle = { fontSize: theme.typography.sm.fontSize, color: "black" }

  return (
    <TouchableOpacity {...touchableOpacityProps}>
      {dayjs(event.end).diff(event.start, 'minute') < 32 && showTime ? (
        <Text style={[eventTitleStyle,{alignSelf:"center",fontSize:Dimensions.get("screen").width/62, fontWeight:"bold"}]}>
          {event.title}
        </Text>
      ) : (
        <>
          <Text style={[eventTitleStyle,{alignSelf:"center",fontSize:Dimensions.get("screen").width/62,textAlignVertical:"bottom",fontWeight:"bold"}]}>{event.title}</Text>
          {event.children && event.children}
        </>
      )}
    </TouchableOpacity>
  )
}
