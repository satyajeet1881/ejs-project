import { isNil } from 'lodash'
import { send } from '../provider'
import { LotteryService } from '../services'
import { ControllersRequest } from '../typings'

async function createLottery ({ request }: ControllersRequest) {
  const data = request.body
  return LotteryService.Instance.saveLottery(data)
}
async function getLotteryData ({ request }: ControllersRequest) {
  const query = request.query as {[key: string]: string | Date | number}
  return LotteryService.Instance.getLotteryData(query)
}
async function updateLottery ({ request }: ControllersRequest) {
  const data = request.body
  const lotteryId = request.params.lotteryId
  return LotteryService.Instance.updateLottery(lotteryId, data)
}
async function deleteLottery ({ request }: ControllersRequest) {
  const lotteryId = request.params.lotteryId
  return LotteryService.Instance.deleteLottery(lotteryId)
}

async function saveLotteryName ({ request }: ControllersRequest) {
  const data = request.body
  return LotteryService.Instance.saveLotteryName(data.lotteryName)
}
async function getLotteryName () {
  return LotteryService.Instance.getLotteryName()
}
async function deleteLotteryName ({ request }: ControllersRequest) {
  const lotteryIdNameId = request.params.lotteryIdNameId
  return LotteryService.Instance.deleteLotteryName(lotteryIdNameId)
}

async function getPublicLotteryData ({ request }: ControllersRequest) {
  const query = request.query as {[key: string]: string | Date | number}
  query['time'] = !isNil(query['time']) ? query['time'] : 7
  query['format'] = !isNil(query['format']) ? query['format'] : 'd'
  return LotteryService.Instance.getPublicData(query)
}

async function getLotteryCounter () {
  return LotteryService.Instance.getLotteryCounter()
}

module.exports = {
  createLottery: send(createLottery, { auth: 'jwtAuth' }),
  getLotteryData: send(getLotteryData, { auth: 'jwtAuth' }),
  saveLotteryName: send(saveLotteryName, { auth: 'jwtAuth' }),
  getLotteryName: send(getLotteryName, { auth: 'jwtAuth' }),
  deleteLotteryName: send(deleteLotteryName, { auth: 'jwtAuth' }),
  getPublicLotteryData: send(getPublicLotteryData, {}),
  getLotteryCounter: send(getLotteryCounter, {}),
  deleteLottery: send(deleteLottery, { auth: 'jwtAuth' }),
  updateLottery: send(updateLottery, { auth: 'jwtAuth' })
}
