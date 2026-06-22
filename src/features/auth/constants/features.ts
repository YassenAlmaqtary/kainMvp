import type { LucideIcon } from 'lucide-react'
import { BarChart3, Cloud, Shield, Zap } from 'lucide-react'

export interface FeatureItem {
  id: 'reports' | 'security' | 'performance' | 'backup'
  icon: LucideIcon
}

export const FEATURE_ITEMS: FeatureItem[] = [
  { id: 'reports', icon: BarChart3 },
  { id: 'security', icon: Shield },
  { id: 'performance', icon: Zap },
  { id: 'backup', icon: Cloud },
]

export const IMAGES = {
  dashboard:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCS8SDaHb956xuYkRFmEHebjaPKKkdQ0q_xKeZTDXkOoRIp4kVJeTZuG_g2BDIGTVLIoE2y7EdHG-MVlqi8lROvtB-5gQBNXpgj9A-RahJtR-I0W0eNIxqeo4D-FAXVQlWrc5gs_fvOb5zfvu3a-Yz0XKCNsb-2U6SE2p_bRk86cABRypeeIuwXyodpsKoP8lbFzHhbeDXCXchjulIUj3vcQwnTfWiSb8WK7JDHkvwqFPywtyofJxT34kJrSozdYcmS2_c',
  mobile:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDnWqo1P3dV5yyeLRWEKyZr-duywdZyzLPgTa8MUoxM0LPXmzZFxP6HcBc3CG4yfzSmYZpa0ABnYYGMpmi1bTjbqtaYwky4AjjZEdot4_BclH_9-YNbsqZEmoHct1BmJCbKy0JdP4pPB-6bb-TnkOv0wuF_1x6sAEQy513t7CbivZPbRvnCssRsEn-RmiBkJPKCIuD6pD93cjKkii0je0Uzp_K9trCp0BqusZ5FS3gcmNkI62gqc1CuPYY4NqaIpcXk0Sw',
} as const
