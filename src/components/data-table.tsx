'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  getFilteredRowModel
} from '@tanstack/react-table';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconSearch
} from '@tabler/icons-react';
import {Card, CardContent, CardHeader, CardTitle} from './ui/card';

export const studentScoresSchema = z.object({
  math: z.number(),
  english: z.number(),
  science: z.number()
});

export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  scores: studentScoresSchema,
  totalScore: z.number().optional(),
  averageScore: z.number().optional(),
  roomName: z.string().optional()
});

function getFlattenedStudentData(data: any) {
  const allStudents: any = [];
  data.classes.forEach((room: any) => {
    room.students.forEach((student: any) => {
      const totalScore =
        student.scores.math + student.scores.english + student.scores.science;
      const averageScore = totalScore / Object.keys(student.scores).length;
      allStudents.push({
        ...student,
        totalScore: totalScore,
        averageScore: parseFloat(averageScore.toFixed(2)),
        roomName: room.name
      });
    });
  });
  return allStudents;
}

import {classData} from '@/data/classes';

const initialStudentData = getFlattenedStudentData(classData);

const studentColumns: ColumnDef<z.infer<typeof studentSchema>>[] = [
  {
    accessorKey: 'name',
    header: () => (
      <Button className="text-left w-full justify-start" variant="ghost">
        Student Name
      </Button>
    ),
    cell: ({row}) => (
      <div className="font-medium">
        {row.original.name} ({row.original.id})
      </div>
    )
  },
  {
    accessorKey: 'roomName',
    header: () => (
      <Button className="text-left w-full justify-start" variant="ghost">
        Room
      </Button>
    )
  },
  {
    accessorKey: 'scores.math',
    header: () => (
      <Button className="text-center w-full justify-center" variant="ghost">
        Math
      </Button>
    ),
    cell: ({row}) => (
      <div className="text-center">{row.original.scores.math}</div>
    )
  },
  {
    accessorKey: 'scores.english',
    header: () => (
      <Button className="text-center w-full justify-center" variant="ghost">
        English
      </Button>
    ),
    cell: ({row}) => (
      <div className="text-center">{row.original.scores.english}</div>
    )
  },
  {
    accessorKey: 'scores.science',
    header: () => (
      <Button className="text-center w-full justify-center" variant="ghost">
        Science
      </Button>
    ),
    cell: ({row}) => (
      <div className="text-center">{row.original.scores.science}</div>
    )
  },
  {
    accessorKey: 'totalScore',
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-right w-full justify-end"
      >
        Total
        <IconChevronDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({row}) => (
      <div className="text-right font-semibold">{row.original.totalScore}</div>
    )
  },
  {
    accessorKey: 'averageScore',
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-right w-full justify-end"
      >
        Average
        <IconChevronDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({row}) => (
      <div className="text-right font-semibold">
        {row.original.averageScore}
      </div>
    )
  }
];

export function StudentDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  function globalFilterFn(row: any, columnId: string, filterValue: string) {
    const {name, id, roomName} = row.original;
    const searchable = `${name} ${id} ${roomName}`.toLowerCase();
    return searchable.includes(filterValue.toLowerCase());
  }

  const table = useReactTable({
    data: initialStudentData,
    columns: studentColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter
    },
    globalFilterFn: globalFilterFn,
    initialState: {
      pagination: {
        pageSize: 10
      }
    }
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Student Lists</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4">
          <IconSearch className="h-5 w-5 text-muted-foreground mr-2" />
          <Input
            placeholder="Search students by name, id or room..."
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={studentColumns.length}
                    className="h-24 text-center"
                  >
                    No students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <IconChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <IconChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <IconChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <IconChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
