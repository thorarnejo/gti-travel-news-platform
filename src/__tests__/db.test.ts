import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals'
import { Pool } from 'pg'
import { query, queryOne } from '../src/lib/db'
import { getArticles } from '../src/lib/articleService'

jest.mock('pg')

describe('Database Connection', () => {
  let mockPool: jest.Mocked<Pool>
  
  beforeEach(() => {
    mockPool = {
      query: jest.fn(),
      connect: jest.fn(),
      end: jest.fn(),
    } as unknown as jest.Mocked<Pool>
    
    // @ts-ignore
    jest.mocked(Pool).mockImplementation(() => mockPool)
  })
  
  afterEach(() => {
    jest.clearAllMocks()
  })
  
  test('query function returns data', async () => {
    const mockResult = { rows: [{ id: 1, name: 'test' }] }
    mockPool.query.mockResolvedValue(mockResult)
    
    const result = await query('SELECT * FROM test')
    expect(result).toEqual(mockResult.rows)
    expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM test', undefined)
  })
  
  test('queryOne function returns first row', async () => {
    const mockResult = { rows: [{ id: 1, name: 'test' }, { id: 2, name: 'test2' }] }
    mockPool.query.mockResolvedValue(mockResult)
    
    const result = await queryOne('SELECT * FROM test')
    expect(result).toEqual(mockResult.rows[0])
    expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM test', undefined)
  })
  
  test('getArticles returns empty array when no articles', async () => {
    mockPool.query
      .mockResolvedValueOnce({ rows: [{ total: '0' }] }) // count query
      .mockResolvedValueOnce({ rows: [] }) // articles query
    
    const result = await getArticles({})
    expect(result.articles).toHaveLength(0)
    expect(result.meta.total).toBe(0)
  })
})
