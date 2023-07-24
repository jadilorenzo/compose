import React from 'react'
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const MathElement = ({text}: {text: string}) => {
  return (
    <InlineMath math={text} />
  )
}

export default MathElement