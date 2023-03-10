import axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError} from 'axios'
import {HttpError} from './HttpError';
import {HttpResult} from './HttpResult'
import {err, Result} from '../result'
import {ParseError} from '../parseError'


type IHttpRequest = {
    url: string,
    config?: AxiosRequestConfig,
    data?: any
}

// A FailableParser is just a Parser wrapped in a Result
type FailableParser<T, M> = (_: T) => Result<M, ParseError>

type Parser<T, M> = {
    parseTo: FailableParser<T, M>
}

export interface IHttpService {
    get<T, M>(request: IHttpRequest, parser: Parser<T, M>): HttpResult<M>

    post<T, M>(request: IHttpRequest, parser: Parser<T, M>): HttpResult<M>
}

export class HttpService implements IHttpService {
    private readonly axiosService: AxiosInstance

    constructor(baseUrl: string) {
        this.axiosService = axios.create({
            baseURL: baseUrl,
            headers: {'Content-Type': 'application/json'}
        })

        this._initializeRequestInterceptor()
        this._initializeResponseInterceptor()
    }

    public async get<T, M>({url, config}: IHttpRequest, parser: Parser<T, M>): HttpResult<M> {
        try {
            const response = await this.axiosService.get<T>(url, config);
            return this._parseFailable<T, M>(response.data, parser.parseTo);
        } catch (error: any) {
            if (this.isAxiosError(error)) {
                const httpError = error.response ? HttpError.fromStatus(error.response.status, error.message) : HttpError.fromMessage(error.message)
                return err(httpError);
            }

            // Request failed due to something else. Let's treat is an exception
            throw error
        }
    }

    public async post<T, M>(
        {url, data, config}: IHttpRequest,
        parser: Parser<T, M>
    ): HttpResult<M> {
        try {
            const response = await this.axiosService.post<T>(url, data, config)

            return this._parseFailable<T, M>(response.data, parser.parseTo)
        } catch (error: any) {
            if (this.isAxiosError(error)) {
                const httpError = error.response
                    ? HttpError.fromStatus(error.response.status, error.message)
                    : HttpError.fromMessage(error.message)

                return err(httpError)
            }

            // Request failed due to something else. Let's treat is an exception
            throw error
        }
    }


    private _parseFailable<T, M>(
        data: T,
        parser: FailableParser<T, M>
    ): Result<M, ParseError> {
        try {
            return parser(data)

        } catch (error: any) {
            const parseError = ParseError.fromError(error)
            return err(parseError)
        }
    }

    private _initializeRequestInterceptor() {
       // this.axiosService.interceptors.request.use(this._handleRequest)
    }

    private _initializeResponseInterceptor() {
        this.axiosService.interceptors.response.use(this._handleResponse)
    }

    private _handleRequest(config: AxiosRequestConfig) {
        // get this from a cookie, or whatever
        // config.headers.Authorization = 'Bearer ...'
        return config
    }

    private isAxiosError(error: Error): error is AxiosError{
        return (error as AxiosError).isAxiosError !== undefined
    }

    private _handleResponse(response: AxiosResponse): AxiosResponse {
        return response
    }
}