import dayjs from 'dayjs'
import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { CalendarCellStyle } from './../../src'

import { u } from '../commonStyles'
import { useTheme } from '../theme/ThemeContext'

interface HourGuideCellProps {
  cellHeight: number
  onPress: (d: dayjs.Dayjs) => void
  date: dayjs.Dayjs
  hour: number
  index: number
  calendarCellStyle?: CalendarCellStyle
  onretract:(d: number) => void
}

const _HourGuideCell = ({
  cellHeight,
  onPress,
  date,
  hour,
  index,
  calendarCellStyle,
  onretract
}: HourGuideCellProps) => {
  const theme = useTheme()

  const getCalendarCellStyle = React.useMemo(
    () => (typeof calendarCellStyle === 'function' ? calendarCellStyle : () => calendarCellStyle),
    [calendarCellStyle],
  )

  return (
    <TouchableWithoutFeedback onPress={() => {
      onPress(date.hour(hour).minute(0))
      onretract(index);
    }
    }>
      <View
        style={[
          u['border-l'],
          u['border-b'],
          { borderColor: theme.palette.gray['200'] },
          { height: cellHeight },
          { ...getCalendarCellStyle(date.toDate(), index) },
        ]}
      />
    </TouchableWithoutFeedback>
  )
}

export const HourGuideCell = React.memo(_HourGuideCell)
