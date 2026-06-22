/**
 * API types used by wired screens — single source, no duplicate names elsewhere.
 * Full OpenAPI catalog lives in `generated/schema.d.ts` (auto).
 */
import type { components } from './generated/schema'

type Schemas = components['schemas']

/** Standard Kian ERP response envelope */
export interface ApiResponse<T> {
  success: boolean
  message?: string | null
  data: T | null
  errors?: string[] | null
}

export type ApiListResponse<T> = ApiResponse<T[]>

// Auth & users
export type LoginRequestDto = Schemas['KianERPApi.DTOs.Requests.LoginRequestDto']
export type RefreshTokenRequestDto = Schemas['KianERPApi.DTOs.Requests.RefreshTokenRequestDto']
export type AuthResponseDto = Schemas['KianERPApi.DTOs.Responses.AuthResponseDto']
export type UserResponseDto = Schemas['KianERPApi.DTOs.Responses.UserResponseDto']
export type UserBranchDto = Schemas['KianERPApi.DTOs.Permission.UserBranchDto']

// Products (POS)
export type ProductLookupDto = Schemas['KianERPApi.DTOs.ProductLookupDto']
export type ProductResponseDto = Schemas['KianERPApi.DTOs.Inventory.ProductResponseDto']
export type ProductUnitDto = Schemas['KianERPApi.DTOs.Inventory.ProductUnitDto']
export type ProductSearchResultDto = Schemas['KianERPApi.DTOs.Inventory.ProductSearchResultDto']
