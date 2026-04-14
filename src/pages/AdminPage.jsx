import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Check, Loader2, ChevronDown, ChevronRight, Flame, Snowflake, Monitor, Smartphone, Tablet } from 'lucide-react'
import { supabase } from '../lib/supabase'

const PROJECT_SLUG   = (import.meta.env.VITE_PROJECT_SLUG   ?? 'las-conchas').trim()
const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD ?? 'admin').trim()
