'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState
} from '@tanstack/react-table';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input'; // Assuming you have this for search
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
  IconSearch // Added for search input
} from '@tabler/icons-react'; // Added for pagination icons
import {Card, CardContent, CardHeader, CardTitle} from './ui/card';

// --- 1. Define Student Schemas ---
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

// --- 2. Prepare the Student Data ---
// const rawStudentData = {
//   classes: [
//     {
//       id: 'room-201',
//       name: 'Room 201',
//       students: [
//         {id: 's1', name: 'Ali', scores: {math: 75, english: 80, science: 88}},
//         {id: 's2', name: 'Zara', scores: {math: 68, english: 72, science: 70}},
//         {id: 's3', name: 'Bilal', scores: {math: 82, english: 76, science: 84}},
//         {
//           id: 's4',
//           name: 'Fatima',
//           scores: {math: 60, english: 64, science: 66}
//         },
//         {id: 's5', name: 'Usman', scores: {math: 70, english: 68, science: 72}},
//         {id: 's6', name: 'Aisha', scores: {math: 77, english: 73, science: 80}},
//         {id: 's7', name: 'Hamza', scores: {math: 64, english: 70, science: 75}},
//         {id: 's8', name: 'Noor', scores: {math: 69, english: 71, science: 78}},
//         {
//           id: 's9',
//           name: 'Yousuf',
//           scores: {math: 72, english: 66, science: 74}
//         },
//         {id: 's10', name: 'Sana', scores: {math: 76, english: 74, science: 82}}
//       ]
//     },
//     {
//       id: 'room-202',
//       name: 'Room 202',
//       students: [
//         {
//           id: 's11',
//           name: 'Rehan',
//           scores: {math: 80, english: 84, science: 88}
//         },
//         {
//           id: 's12',
//           name: 'Mehak',
//           scores: {math: 78, english: 76, science: 85}
//         },
//         {
//           id: 's13',
//           name: 'Ahmed',
//           scores: {math: 82, english: 80, science: 87}
//         },
//         {
//           id: 's14',
//           name: 'Laiba',
//           scores: {math: 76, english: 79, science: 82}
//         },
//         {
//           id: 's15',
//           name: 'Tariq',
//           scores: {math: 84, english: 77, science: 80}
//         },
//         {id: 's16', name: 'Hiba', scores: {math: 75, english: 74, science: 79}},
//         {
//           id: 's17',
//           name: 'Salman',
//           scores: {math: 79, english: 81, science: 86}
//         },
//         {id: 's18', name: 'Iqra', scores: {math: 73, english: 75, science: 78}},
//         {
//           id: 's19',
//           name: 'Junaid',
//           scores: {math: 70, english: 72, science: 75}
//         },
//         {id: 's20', name: 'Sadia', scores: {math: 85, english: 88, science: 90}}
//       ]
//     }
//   ],
//   subjects: ['math', 'english', 'science']
// };

// Helper function to flatten and enrich student data
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

import studentData from '@/data/dashboard.json';

const initialStudentData = getFlattenedStudentData(studentData);

// --- 3. Define Student-Specific Columns ---
const studentColumns: ColumnDef<z.infer<typeof studentSchema>>[] = [
  {
    accessorKey: 'name',
    header: () => {
      return (
        <Button className="text-left w-full justify-start" variant="ghost">
          Student Name
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="font-medium">
        {row.original.name} ({row.original.id})
      </div>
    ),
    filterFn: 'includesString' // Enable filtering by name
  },
  {
    accessorKey: 'roomName',
    header: () => {
      return (
        <Button className="text-left w-full justify-start" variant="ghost">
          Room
        </Button>
      );
    }
  },
  {
    accessorKey: 'scores.math',
    header: () => {
      return (
        <Button className="text-center w-full justify-center" variant="ghost">
          Math
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="text-center">{row.original.scores.math}</div>
    )
  },
  {
    accessorKey: 'scores.english',
    header: () => {
      return (
        <Button className="text-center w-full justify-center" variant="ghost">
          English
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="text-center">{row.original.scores.english}</div>
    )
  },
  {
    accessorKey: 'scores.science',
    header: () => {
      return (
        <Button className="text-center w-full justify-center" variant="ghost">
          Science
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="text-center">{row.original.scores.science}</div>
    )
  },
  {
    accessorKey: 'totalScore',
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-right w-full justify-end"
        >
          Total
          <IconChevronDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="text-right font-semibold">{row.original.totalScore}</div>
    )
  },
  {
    accessorKey: 'averageScore',
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-right w-full justify-end"
        >
          Average
          <IconChevronDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="text-right font-semibold">
        {row.original.averageScore}
      </div>
    )
  }
];

// --- 4. Simplified DataTable Component ---
export function StudentDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data: initialStudentData,
    columns: studentColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter
    },
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
        {/* Search Input */}
        <div className="flex items-center py-4">
          <IconSearch className="h-5 w-5 text-muted-foreground mr-2" />
          <Input
            placeholder="Search students by name..."
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
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
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

        {/* Pagination Controls */}
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
