import {AsyncResult} from '../result'
import {HttpError} from './HttpError'
import {ParseError} from '../parseError'

export type HttpResult<T> = AsyncResult<T,  HttpError| ParseError>