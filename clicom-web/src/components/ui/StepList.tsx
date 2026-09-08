import { Icon } from './Icon'

export type StepListStep = {
  label: string
  title: string
  description: string
  items: string[]
}

type StepListProps = {
  steps: readonly StepListStep[]
}

export function StepList({ steps }: StepListProps) {
  return <ol className="step-list">
    {steps.map((step, index) => <li className="step-list-item" key={step.label}>
      <div className="step-list-marker" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></div>
      <div className="step-list-content">
        <p className="step-list-label">{step.label}</p>
        <h3>{step.title}</h3>
        <p className="step-list-description">{step.description}</p>
        <ul>
          {step.items.map((item) => <li key={item}><Icon name="check" size={16} />{item}</li>)}
        </ul>
      </div>
    </li>)}
  </ol>
}