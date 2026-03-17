// User Types
export interface User {
  id: string
  name: string | null
  email: string
  image: string | null
  phone: string | null
  role: 'USER' | 'ADVISOR' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

// Advisor Types
export interface Advisor {
  id: string
  userId: string
  title: string | null
  bio: string | null
  experience: number
  company: string | null
  licenseNumber: string | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'
  rating: number
  totalReviews: number
  totalConsultations: number
  pricePerSession: number | null
  pricePerHour: number | null
  user: User
  specialties: AdvisorSpecialty[]
}

export interface AdvisorSpecialty {
  id: string
  name: string
  level: string | null
  description: string | null
}

// Service Types
export interface Service {
  id: string
  advisorId: string
  name: string
  description: string | null
  type: 'SINGLE_SESSION' | 'HOURLY' | 'SUBSCRIPTION'
  price: number
  duration: number | null
  period: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | null
  sessionsLimit: number | null
  isActive: boolean
}

// Consultation Types
export interface Consultation {
  id: string
  userId: string
  advisorId: string
  type: 'SINGLE' | 'HOURLY' | 'PACKAGE'
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED'
  scheduledAt: Date | null
  startedAt: Date | null
  endedAt: Date | null
  duration: number | null
  price: number
  notes: string | null
  user: User
  advisor: Advisor
}

// Review Types
export interface Review {
  id: string
  userId: string
  advisorId: string
  consultationId: string
  rating: number
  content: string | null
  isAnonymous: boolean
  createdAt: Date
  user: User
}

// Payment Types
export interface Order {
  id: string
  orderNo: string
  userId: string
  amount: number
  currency: string
  status: 'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED' | 'CANCELLED'
  paymentMethod: 'STRIPE' | 'ALIPAY' | 'WECHAT' | null
  createdAt: Date
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Pagination Types
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
