
import { isNil, pick } from 'lodash'
import moment from 'moment'
import { ObjectId } from 'mongodb'
import { paginate } from '../utils'
import { LotteryRepository, LotteryNameRepository } from '../database/repository'
import { Lottery } from '../typings'
export class LotteryService {
   private static instance: LotteryService
   private readonly lotteryRepository: LotteryRepository
   private readonly lotteryNameRepository: LotteryNameRepository
   constructor () {
     this.lotteryRepository = new LotteryRepository()
     this.lotteryNameRepository = new LotteryNameRepository()
   }

   public async saveLottery (data: Omit<Lottery, '_id'>) {
     return this.lotteryRepository.saveLottery({
       lotteryName: data.lotteryName,
       code: data.code,
       publishDate: data.publishDate,
       isDeleted: false
     })
   }

   public async getLotteryData (queryParameter: {[key: string]: string | Date | number}) {
     const filter = paginate(queryParameter)
     return this.lotteryRepository.getLottery(this.getQuery(queryParameter), filter)
   }

   public async getPublicData (queryParameter: {[key: string]: string | Date | number}) {
     const filter = paginate(queryParameter)
     return this.lotteryRepository.getLottery(this.getPublicQuery(queryParameter), filter)
   }

   public async updateLottery (id: string, update: Partial<Lottery>) {
     return this.lotteryRepository.updateLottery({ _id: new ObjectId(id) }, { ...pick(update, ['lotteryName', 'code', 'publishDate']) })
   }

   public async saveLotteryName (name: string) {
     return this.lotteryNameRepository.saveLotteryName(name)
   }

   public async deleteLotteryName (id: string) {
     return this.lotteryNameRepository.deleteLotteryName({ _id: new ObjectId(id) })
   }

   public async getLotteryName () {
     return this.lotteryNameRepository.getLotteryName()
   }

   public async deleteLottery (id: string) {
     return this.lotteryRepository.deleteLottery({ _id: new ObjectId(id) })
   }

   getQuery(query: {[key: string]: string | Date | number}): any {
     const result = {} as any

     if (Object.prototype.hasOwnProperty.call(query, 'lotteryName') && !isNil(query['lotteryName']))
       result['lotteryName'] = query.lotteryName

     if (Object.prototype.hasOwnProperty.call(query, 'code') && !isNil(query['code']))
       result['code'] = query.code

     if (Object.prototype.hasOwnProperty.call(query, 'publishDate') && !isNil(query['publishDate'])) {
       const $gte = moment(query.publishDate as string).startOf('day').toDate()
       const $lte = moment(query.publishDate as string).endOf('day').toDate()
       result['publishDate'] = { $gte, $lte }
     }

     if (Object.prototype.hasOwnProperty.call(query, 'time') && !isNil(query['time']) &&
     Object.prototype.hasOwnProperty.call(query, 'format') && !isNil(query['format'])) {
       const date = this.getDateQuery(Number(query['time']), query['format'] as string)
       const $gte = moment(date).startOf('day').toDate()
       const $lte = moment(new Date()).endOf('day').toDate()
       result['publishDate'] = { $gte, $lte }
     }

     return result
   }

   getPublicQuery(query: {[key: string]: string | Date | number}): any {
     const result = {} as any
     const currentTimestamp = new Date().valueOf()
     if (Object.prototype.hasOwnProperty.call(query, 'lotteryName') && !isNil(query['lotteryName']))
       result['lotteryName'] = query.lotteryName

     if (Object.prototype.hasOwnProperty.call(query, 'publishDate') && !isNil(query['publishDate'])) {
       const $gte = moment(query.publishDate as string).startOf('day').toDate()
       let $lte = moment(query.publishDate as string).endOf('day').toDate()
       if (currentTimestamp < $lte.valueOf())
         $lte = new Date()

       result['publishDate'] = { $gte, $lte }
     }

     const isMonth = Object.prototype.hasOwnProperty.call(query, 'month') && !isNil(query['month'])
     const isYear = Object.prototype.hasOwnProperty.call(query, 'year') && !isNil(query['year'])
     if (isMonth && isYear) {
       const startDate = new Date(`${Number(query.year)}-${Number(query.month)}-01`)
       const endDate = new Date(`${Number(query.year)}-${Number(query.month) + 1}-01`)
       const $gte = moment(startDate).startOf('day').toDate()
       let $lte = moment(endDate).startOf('day').toDate()
       if (currentTimestamp < $lte.valueOf())
         $lte = new Date()

       result['publishDate'] = { $gte, $lte }
     }
     return result
   }

   getDateQuery(time: number, format: string): Date {
     const date = new Date()
     switch (format) {
       case 'd': {
         date.setDate(date.getDate() - time)
         return date
       }
       case 'w': {
         date.setDate(date.getDate() - time * 7)
         return date
       }
       case 'm': {
         date.setMonth(date.getMonth() - time)
         return date
       }
       case 'y': {
         date.setFullYear(date.getFullYear() - time)
         return date
       }
       default: {
         date.setDate(date.getDate() - 7)
         return date
       }
     }
   }

   public static get Instance () {
     if (isNil(this.instance))
       this.instance = new this()

     return this.instance
   }
}
