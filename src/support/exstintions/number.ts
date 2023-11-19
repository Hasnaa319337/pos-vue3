// @ts-ignore

// declare
{
  interface Number {
    toFormat(): number

    toNegativeFormat(minimumFractionDigits: number): number

    isNegative(ifTrue: string | boolean, ifFalse: string | boolean): boolean
  }
}

// @ts-ignore
Number.prototype.toFormat = function (minimumFractionDigits: number) {
  return Number(this).toLocaleString('en-US', {
    minimumFractionDigits: minimumFractionDigits
  })
}

// @ts-ignore
Number.prototype.toNegativeFormat = function (minimumFractionDigits: number = 2) {
  return Math.abs(Number(this)).toLocaleString('en-US', {
    minimumFractionDigits: minimumFractionDigits
  })
}

// @ts-ignore
Number.prototype.isNegative = function (
  ifTrue: string | boolean = true,
  ifFalse: string | boolean = false
) {
  return Number(this) < 0 ? ifTrue : ifFalse
}
