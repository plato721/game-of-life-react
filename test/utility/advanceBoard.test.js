import advanceBoard from "../../utility/advanceBoard"

test("a blank board becomes a blank board", () => {
  const board = [
    [false, false],
    [false, false],
  ]
  const nextBoard = advanceBoard(board)

  const expected = [
    [false, false],
    [false, false],
  ]
  expect(nextBoard).toEqual(expected)
})

test("a full 2x2 board becomes a full board", () => {
  const board = [
    [true, true],
    [true, true],
  ]
  const nextBoard = advanceBoard(board)

  const expected = [
    [true, true],
    [true, true],
  ]
  expect(nextBoard).toEqual(expected)
})

test("a dead corner cell comes back to life", () => {
  const board = [
    [true, true],
    [false, true],
  ]
  const nextBoard = advanceBoard(board)

  const expected = [
    [true, true],
    [true, true],
  ]
  expect(nextBoard).toEqual(expected)
})

test("cross-corner alive and dead die", () => {
  const board = [
    [true, false],
    [false, true],
  ]
  const nextBoard = advanceBoard(board)

  const expected = [
    [false, false],
    [false, false],
  ]
  expect(nextBoard).toEqual(expected)
})

test("3-in-a-row alternating pattern", () => {
  const threeVertical = [
    [false, true, false],
    [false, true, false],
    [false, true, false],
  ]
  const threeHorizontal = [
    [false, false, false],
    [true, true, true],
    [false, false, false],
  ]
  expect(advanceBoard(threeVertical)).toEqual(threeHorizontal)
  expect(advanceBoard(threeHorizontal)).toEqual(threeVertical)
})
