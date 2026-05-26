import DailyGoalProgress from '../DailyGoalsProgress/DailyGoalsProgress'
import SmartInsights from '../SmartInsights/SmartInsights'
import WeeklyProgress from '../WeaklyProgress/WeaklyProgress'
import WeightJourney from '../WeightJourney/WeightJourney'
import './ProgressSection.css'

const ProgressSection = () => {
  return (
    <div className='ProgressContainer'>
      <div>
       <WeightJourney/>
       <DailyGoalProgress/>
      </div>
      <div>
       <WeeklyProgress/>
       <SmartInsights   insightsTitle="Smart Insights"
                       calories={2200}
                       streak={5}
                       water={4}/>
    </div>
   
     
    </div>
  )
}

export default ProgressSection
